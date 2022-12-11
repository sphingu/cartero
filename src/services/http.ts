import toast, { ToastPosition } from "solid-toast";

const baseUrl = import.meta.env.VITE_API_URL;

interface MakeRequestOptions {
  url: string;
  method?: "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
  body?: any;
  msgs?: { loading: string; error: string; success: string };
  options?: RequestInit;
}

const toastOptions = {
  position: "top-right" as ToastPosition,
};

const getHeaders = () => {
  const token = localStorage.token;
  const location = localStorage.location;
  const headers = new Headers();
  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }
  if (location) {
    headers.append("Location-Id", location);
  }

  return headers;
};

export async function makeRequest<T>({
  url,
  method = "GET",
  options,
  body,
  msgs,
}: MakeRequestOptions): Promise<T> {
  const id = toast.loading(msgs?.loading || "Requesting...", toastOptions);

  const response = await fetch(`${baseUrl}${url}`, {
    ...options,
    method,
    headers: getHeaders(),
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await response.text();

  let data;
  try {
    data = JSON.parse(text);
  } catch (error) {
    // console.log("failed to parse", error);
  }

  // success case
  if (response.ok && !data?.error) {
    toast.success(msgs?.success || "Success", {
      ...toastOptions,
      id,
    });
    return data?.data || data;
  }

  // error case
  if (response.status === 401) {
    localStorage.token = "";
    toast.error("Token expired, redirecting to login", {
      ...toastOptions,
      id,
    });
    setTimeout(() => {
      //TODO: Implement calling login API later here
      window.location.reload();
    }, 1000);
  } else {
    toast.error(`Error: ${response.status}\n${data?.error || text}`, {
      ...toastOptions,
      id,
    });
  }
  throw new Error("An error occurred in fetching information");
}
