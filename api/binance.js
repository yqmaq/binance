export default async function handler(req, res) {
  try {
    const targetUrl = req.query.url;
    if (!targetUrl) {
      return res.status(400).json({ error: "缺少 url 参数" });
    }

    // 转发请求
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const data = await response.json();

    // 允许跨域，前端可直接调用
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "请求失败", msg: err.message });
  }
}
