export function showToast(message, type = "success") {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("spms-toast", { detail: { message, type } }));
  }
}

export default showToast;
