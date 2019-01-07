/**
 * 封装 localStorage 方法
 */

/**
 * 设置本地存储
 * @param {string} name key
 * @param {*} value value 可以是string、obj等
 * @param {number} time 缓存时间(ms)
 */
export const setStorage = (name, value, time) => {
    if (!name) return
    const storage = {
        createdTime: new Date().getTime(),
        cacheTime: time,
        data: value,
    }
    window.localStorage.setItem(name, JSON.stringify(storage))
}

/**
 * 清除本地存储
 * @param {string} name key
 */
export const clearStorage = name => {
    if (!name) return
    window.localStorage.removeItem(name)
}

/**
 * 获取本地存储
 * 如果未设置缓存时间或者在缓存时间内则返回数据
 * 如果过期则返回 undefined
 * @param {string} name key
 */
export const getStorage = name => {
    if (!name) return
    const storage = JSON.parse(window.localStorage.getItem(name));
    if (!storage) return
    if (storage.cacheTime && new Date().getTime() - storage.createdTime > storage.cacheTime) {
        clearStorage(name)
        return
    }
    return storage.data
}