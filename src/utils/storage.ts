interface StorageConfig {
  storageType?: 'localStorage' | 'sessionStorage';
  namespace?: string | undefined;
}

export function setItem(
  key: string,
  value: any,
  config?: StorageConfig,
): boolean {
  const { storage, namespace } = processConfig(config);
  const namespacedKey = getNamespacedKey(key, namespace);

  try {
    storage.setItem(namespacedKey, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export function getItem<T = any>(
  key: string,
  config?: StorageConfig,
): T | null {
  const { storage, namespace } = processConfig(config);
  const namespacedKey = getNamespacedKey(key, namespace);

  try {
    const value = storage.getItem(namespacedKey);
    return value ? (JSON.parse(value) as T) : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function removeItem(key: string, config?: StorageConfig): boolean {
  const { storage, namespace } = processConfig(config);
  const namespacedKey = getNamespacedKey(key, namespace);

  try {
    storage.removeItem(namespacedKey);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export function clear(config?: StorageConfig): boolean {
  const { storage, namespace } = processConfig(config);

  try {
    if (namespace) {
      Object.keys(storage).forEach((key) => {
        if (key.startsWith(namespace)) {
          storage.removeItem(key);
        }
      });
    } else {
      storage.clear();
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

function processConfig(config: StorageConfig = {}) {
  const { storageType = 'localStorage', namespace } = config;
  const storage = window[storageType];

  return {
    storage,
    namespace,
  };
}

function getNamespacedKey(key: string, namespace?: string) {
  return namespace ? `${namespace}:${key}` : key;
}
