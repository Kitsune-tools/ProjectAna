import { Injectable } from '@angular/core';
import { ChatServerConnection } from '../models/app.models'
import { ChatFlowPack } from '../models/chatflow.models';
@Injectable()
export class SettingsService {
	constructor() { }
	loadSavedConnections() {
		var loaded = JSON.parse(localStorage.getItem(SettingKey.SavedConnsKey)) as ChatServerConnection[];
		if (loaded)
			return loaded;
		else
			return [];
	}

	saveSavedConnections(connections: ChatServerConnection[]) {
		localStorage.setItem(SettingKey.SavedConnsKey, JSON.stringify(connections));
	}

	saveChatProject(chatProjectName: string, pack: ChatFlowPack, quite: boolean) {
		chatProjectName += '.anaproj';

		if (quite) {
			localStorage.setItem(chatProjectName, JSON.stringify(pack));
		} else {
			let existing = localStorage.getItem(chatProjectName);
			if (existing) {
				if (confirm("Chat project the given name already exists. Do you want to overwrite it?"))
					localStorage.setItem(chatProjectName, JSON.stringify(pack));
			}
			else
				localStorage.setItem(chatProjectName, JSON.stringify(pack));
		}
	}

	getChatProject(chatProjectName: string) {
		chatProjectName += '.anaproj';

		let existing = localStorage.getItem(chatProjectName);
		if (!existing) {
			alert(`Chat Project with name '${chatProjectName}' does not exist`);
			return null;
		}
		return JSON.parse(existing) as ChatFlowPack;
	}

	listSavedChatProjectNames() {
		let savedProjs = [];
		for (var key in localStorage) {
			if (key.endsWith('.anaproj')) {
				let name = key.replace(new RegExp('\.anaproj$'), '');
				savedProjs.push(name);
			}
		}
		return savedProjs;
	}

	renameChatProject(oldName: string, newName: string) {
		oldName += ".anaproj";
		newName += ".anaproj";

		let temp = localStorage.getItem(oldName);
		if (!temp) {
			alert(`${oldName} not found`);
			return;
		}
		localStorage.setItem(newName, temp);
		localStorage.removeItem(oldName);
	}

	deleteChatProject(name: string) {
		name += ".anaproj";

		let exists = localStorage.getItem(name);
		if (!exists) {
			alert(`${name} not found`);
			return false;
		}
		localStorage.removeItem(name);
		return true;
	}
}

enum SettingKey {
	SavedConnsKey = 'SAVED_CONNECTIONS'
}