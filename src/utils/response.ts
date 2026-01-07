import { generateUserAgent } from "@imaginerlabs/user-agent-generator";
import axios, { AxiosRequestConfig } from "axios";

const response = async (url: string, method: 'GET' | 'POST'): Promise<string> => {
    const headers: Record<string, string> = {
        'User-Agent': (generateUserAgent({
            device: 'windows'
        }) as string),
        Accept: '*/*'
    };

    const config: AxiosRequestConfig<string> = {
        url,
        method,
        responseType: 'text',
        headers,
        withCredentials: true,
    };

    const res = await axios(config);
    return res.data as string;
}