export interface MenuItem {
	label: string;
	onClick?: VoidFunction;
	link?: string;
}

export interface BaseModel {
	createdAt?: string;
}

export interface ListModel<T> {
	data: T[];
	message: string;
}
