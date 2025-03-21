/* eslint-disable @typescript-eslint/no-explicit-any */
import { h, createRef as gCreateRef, Component as gComponent } from "gridjs";
import { mount, unmount } from "svelte";
import type { Component } from "svelte";

interface SvelteWrapperProps {
	component: Component;
	props?: Record<string, any>;
	style?: string;
	class?: string;
}

export class SvelteWrapper extends gComponent<SvelteWrapperProps> {
	ref = gCreateRef();
	instance: ReturnType<typeof mount> | null = null;

	componentDidMount() {
		this.mountComponent();
	}

	componentDidUpdate(prevProps: SvelteWrapperProps) {
		if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
			this.destroyComponent();
			this.mountComponent();
		}
	}

	componentWillUnmount() {
		this.destroyComponent();
	}

	mountComponent() {
		const { component, props = {} } = this.props;

		if (this.ref.current) {
			this.instance = mount(component, {
				target: this.ref.current,
				props,
			});
		}
	}

	destroyComponent() {
		if (this.instance) {
			unmount(this.instance);
			this.instance = null;
		}
	}

	render() {
		return h("div", { ref: this.ref, style: this.props.style, class: this.props.class });
	}
}
