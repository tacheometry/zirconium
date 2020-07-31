import { CustomCommandType } from "@types/CustomTypes";

export namespace CmdCoreRegistryService {
	// const commands = new Array<Command<defined>>();
	const types = new Map<string, CustomCommandType<defined>>();
	function makeEnumType<T extends string>(name: string, values: T[]): CustomCommandType<T> {
		return {
			displayName: `Enum(${name})`,
			validate(value) {
				if (values.includes(value as T)) {
					return { success: true };
				} else {
					return {
						success: false,
						reason: `'${value}' is not a valid value for ${name} - Expected ${values.join(", ")}`,
					};
				}
			},
			parse(value) {
				return value;
			},
		};
	}

	export function RegisterEnumType<T extends string>(name: string, values: T[]) {
		const e = makeEnumType(name, values);
		types.set(name, e);
		return e;
	}

	export function RegisterType<T, U>(name: string, type: CustomCommandType<T, U>) {
		types.set(name, type);
	}
}
export type CmdCoreRegistryService = typeof CmdCoreRegistryService;