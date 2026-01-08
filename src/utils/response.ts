import { generateUserAgent } from "@imaginerlabs/user-agent-generator";
import axios, { AxiosRequestConfig } from "axios";
import https from "https";

const response = async (url: string, method: 'GET' | 'POST'): Promise<string> => {
    const headers: Record<string, string> = {
        'User-Agent':
            // 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0'
            (generateUserAgent({
                device: 'windows'
            }) as string),
        Accept: '*/*',
        'Cookie': '_fw_crm_v=0a9adba2-cc63-439b-95f6-2ab36ad06157; cf_clearance=qG7fbj3k92OGv556wawfSSpDQ991.xNQH8icSqRzRJk-1767822714-1.2.1.1-r95Px6JEdWPeLXQRr4kVmuXtDouAhn8jt2teHPaEVLjKBl_WbDc3J5nJ9EcCuZZr3dps0iSd87_004etJoudYaNwrBZ_cD50kCS.mbu.UROocBCPTPZ3QFeNUW3_Z81U6y4c83eVEODnSQLu1Zxu.ddWCli6diuGQexiB0ydFgUW4GPxObnJlE6svvBwLTa4O7dyhl2GydO26kFvlY3_qV7yGZ5HHYq_TbTSIG..FTE'
    };


    const agent = new https.Agent({ family: 4 });

    const config: AxiosRequestConfig<string> = {
        url,
        method,
        responseType: 'text',
        headers,
        withCredentials: true,
        timeout: 60_000,
        httpsAgent: agent,
    };


    const res = await axios(config);
    return res.data as string;
}

export default response;