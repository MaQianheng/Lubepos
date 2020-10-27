import axios from 'axios'
//data: {k: v}
export default function httpRequest(url, data, type) {
    if (type === 'GET') {
        let paramStr = ''
        Object.keys(data).forEach(key => {
            paramStr += key + '=' + data[key] + '&'
        })
        if (paramStr) {
            paramStr = paramStr.substring(0, paramStr.length - 1)
        }
        // 使用axios发get请求
        return axios.get(url + '?' + paramStr)
        // return axios.get(`${url}?username=${data.username}&password=${data.password}`)
    } else {
        if ("carImages" in data) {
            const fd = new FormData()
            Object.keys(data).forEach(key => {
                fd.append(key, data[key])
                if (key === "carImages") {
                    for (let i = 0; i < data[key].length; i++) {
                        fd.append(key, data[key][i])
                    }
                }
            })
            return axios.post(url, fd, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
        }
        return axios.post(url, data)
    }
}