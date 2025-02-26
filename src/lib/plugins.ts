/* eslint-disable @typescript-eslint/no-explicit-any */
import { h, createRef as gCreateRef, Component as gComponent } from "gridjs";
import type { Component } from "svelte";

interface SvelteWrapperProps {
	component: new (options: { target: HTMLElement; props?: Record<string, any> }) => Component;
	parentProps?: Record<string, any>;
	parentElement?: string;
	[key: string]: any;
}

export class SvelteWrapper extends gComponent<SvelteWrapperProps> {
	static defaultProps = {
		parentElement: "div",
		parentProps: {},
	};

	ref = gCreateRef();
	instance: Component | null = null;

	componentDidMount() {
		this.mountComponent();
	}

	componentDidUpdate(prevProps: SvelteWrapperProps) {
		if (this.instance && JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
			this.destroyComponent();
			this.mountComponent();
		}
	}

	componentWillUnmount() {
		this.destroyComponent();
	}

	mountComponent() {
		const { component: Component, ...props } = this.props;

		this.instance = new Component({
			target: this.ref.current!,
			props: { ...props },
		});
	}

	destroyComponent() {
		if (this.instance) {
			this.ref.current!.innerHTML = "";
			this.instance = null;
		}
	}

	render() {
		return h(this.props.parentElement || "div", { ...this.props.parentProps, ref: this.ref });
	}
}
