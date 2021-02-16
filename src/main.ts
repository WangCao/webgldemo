export class TypedArrayList<T extends Uint16Array | Float32Array | Uint8Array> {
	private _array: T;
	private _typedArrayConstructor: new (length: number) => T;
	private _length: number;
	private _capacity: number;

	public capacityChangedCallback: ((arrayList: TypedArrayList<T>)=> void) | null = null;

	public constructor(
		typedArrayConstructor: new (capacity: number) => T,
		capacity: number = 8
	) {
		this._typedArrayConstructor = typedArrayConstructor;
		this._capacity = capacity;
		if (this._capacity === 0) {
			this._capacity = 8;
		}
		this._array = new this._typedArrayConstructor(this._capacity);
		this._length = 0;
	}

	public push(num: number): number {
		if (this._length >= this._capacity) {
			if (this._capacity > 0) {
				this._capacity += this._capacity;
				console.log("cuur capacity = ", this._capacity);
			}
			let oldArray: T = this._array;
			this._array = new this._typedArrayConstructor(this._capacity);
			this._array.set(oldArray);

			if(this.capacityChangedCallback !== null) {
				this.capacityChangedCallback(this);
			}
		}
		this._array[this._length++] = num;
		return this._length;
	}

	public get length(): number {
		return this._length;
	}

	public get capacity(): number {
		return this._capacity;
	}

	public get typeArray(): T {
		return this._array;
	}

	public subArray( start: number = 0, end: number =this.length ): T {
		return this._array.subarray(start, end) as T;
	}

	public slice( start:number = 0, end: number = this.length): T {
		return this._array.slice(start, end) as T;
	}

	public clear(): void {
		this._length = 0;
	}

	public at(idx: number): number {
		if (idx < 0 || idx >= this.length) {
			throw new Error("索引越界")
		}
		let ret: number = this._array[idx]
		return ret;
	}
}

export class Dictionary<T> {
	private _item: ({[key: string]: T}) | Map<string,T>;
	private _count: number = 0;
	public constructor (useES6Map: boolean = true) {
		if (useES6Map === true) {
			this._item = new Map<string ,T>();
		}else {
			this._item = {};
		}
	}
	public get length(): number {
		return this._count;
	}
	public contains(key: string): boolean {
		if (this._item instanceof Map) {
			return this._item.has(key);
		}else {
			return (this._item[key] !== undefined)
		}
	}
	public find(key: string): T | undefined {
		if (this._item instanceof Map) {
			return this._item.get(key);
		}else {
			return this._item[key];
		}
	}
	public insert(key: string, value: T):void {
		if (this._item instanceof Map) {
			this._item.set(key,value)
		}else {
			this._item[key] = value;
		}
		this._count++;
	}
	public remove(key: string): boolean {
		let ret: T | undefined = this.find(key);
		if (ret === undefined) {
			return false;
		}
		if (this._item instanceof Map) {
			this._item.delete(key);
		}else {
			delete this._item[key];
		}
		this._count--;
		return true;
	}
	public get keys(): string[] {
		let keys: string[] = [];
		if (this._item instanceof Map) {
			let keyArray = this._item.keys();
			for(let key of keyArray) {
				keys.push(key);
			}
		}else {
			for(let prop in this._item) {
				if(this._item.hasOwnProperty(prop)) {
					keys.push(prop);
				}
			}
		}
		return keys;
	}
	public get values(): T[] {
		let values: T[] = [];
		if(this._item instanceof Map) {
			let vArray = this._item.values();
			for(let value of vArray) {
				values.push(value);
			}
		}else {
			for(let prop in this._item) {
				if (this._item.hasOwnProperty(prop)) {
					values.push(this._item[prop]);
				}
			}
		}
		return values;
	}
	public toString(): string {
		return JSON.stringify(this._item as Map<String, T>);
	}
}
export class ListNode<T> {
	public next: ListNode<T> | null;
	public prev: ListNode<T> | null;
	public data: T | undefined = undefined;
	public constructor (data: T | undefined = undefined) {
		this.next = this.prev = null;
		this.data = data;
	}
}

export class List<T> {
	private _headNode: ListNode<T>;
	private _length: number;
	public constructor() {
		this._headNode = new ListNode<T>();
		this._headNode.next = this._headNode;
		this._headNode.prev = this._headNode;
		this._length = 0;
	}

	public empty():boolean {
		return this._headNode.next === this._headNode;
	}
	public get length(): number {
		return this._length;
	}

	public begin(): ListNode<T> {
		if (this._headNode.next === null) {
			throw new Error("头结点的next指针必须不为null")
		}
		return this._headNode.next;
	}

	public end(): ListNode<T> {
		return this._headNode;
	}

	
}