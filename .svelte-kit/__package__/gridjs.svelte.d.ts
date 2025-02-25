import { Grid } from "gridjs";
import type { Config } from "gridjs";
interface Props {
    width?: Config["width"];
    height?: Config["height"];
    autoWidth?: Config["autoWidth"];
    fixedHeader?: Config["fixedHeader"];
    resizable?: Config["resizable"];
    from?: Config["from"];
    language?: Config["language"];
    search?: Config["search"];
    sort?: Config["sort"];
    pagination?: Config["pagination"];
    server?: Config["server"];
    columns?: Config["columns"];
    data?: Config["data"];
    plugins?: Config["plugins"];
    style?: Config["style"];
    className?: Config["className"];
    onload?: (event: CustomEvent) => void;
    onready?: (event: CustomEvent) => void;
    onbeforeLoad: (event: CustomEvent) => void;
    oncellClick: (event: CustomEvent) => void;
    onrowClick: (event: CustomEvent) => void;
}
declare const Gridjs: import("svelte").Component<Props, {
    instance: Grid;
    eventTarget: EventTarget;
}, "">;
type Gridjs = ReturnType<typeof Gridjs>;
export default Gridjs;
