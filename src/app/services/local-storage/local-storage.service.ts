import {Injectable} from '@angular/core';
import {LocalStorageTypes} from '../../interfaces/local-storage.interface';

const PROJECT_NAME = "GITHUB";

@Injectable({
	providedIn: 'root'
})
export class LocalStorageService {

	/**
	 * Get the storage facility
	 * @param storageType {LocalStorageTypes}
	 * @private
	 * @returns {localStorage|sessionStorage}
	 */
	private static _getStorage(storageType: LocalStorageTypes) {
		return storageType === LocalStorageTypes.LOCAL ? localStorage : sessionStorage;
	}

	/**
	 * Get a localStorage or sessionStorage item value
	 * @param storageType {'local'|'session'}
	 * @param key {string}
	 */
	static getItem(storageType: LocalStorageTypes, key: string) {
		const storage = LocalStorageService._getStorage(storageType);
		const val = storage.getItem(`${PROJECT_NAME}:${key}`);
		try {
            if(val != null)
			    return JSON.parse(val);
            else
                return null;
		} catch (e) {
			return val;
		}
	}

	/**
	 * Set a localStorage or sessionStorage item value
	 * @param storageType {LocalStorageTypes}
	 * @param key {string}
	 * @param value {any}
	 */
	static setItem(storageType: LocalStorageTypes, key: string, value: any) {
		const storage = LocalStorageService._getStorage(storageType);
		const val = typeof value === 'string' ? value : JSON.stringify(value);
		storage.setItem(`${PROJECT_NAME}:${key}`, val);
	}

	/**
	 * Remove an item from localStorage or sessionStorage
	 * @param storageType {LocalStorageTypes}
	 * @param key {string}
	 */
	static removeItem(storageType: LocalStorageTypes, key: string) {
		const storage = LocalStorageService._getStorage(storageType);
		storage.removeItem(`${PROJECT_NAME}:${key}`);
	}

}