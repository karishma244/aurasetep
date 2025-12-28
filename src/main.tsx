import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// DEV guard: wrap postMessage to avoid third-party postMessage origin errors flooding the console during local development
if ((import.meta as any).env && (import.meta as any).env.DEV) {
	try {
		const _nativePost = (window as any).postMessage?.bind(window);
		if (_nativePost) {
			(window as any).postMessage = function (message: any, targetOrigin: any, transfer?: any) {
				try {
					return _nativePost(message, targetOrigin, transfer);
				} catch (e) {
					// swallow DOMException from mismatched targetOrigin in dev
					// eslint-disable-next-line no-console
					console.debug("Suppressed postMessage error in DEV:", e && e.message ? e.message : e);
				}
			};
		}
	} catch (e) {
		// ignore
	}
}

createRoot(document.getElementById("root")!).render(<App />);
