export function ensure<T>() {
	return <X extends T>(v: X) => v;
}
