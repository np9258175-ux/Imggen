const API_KEY = "mhk_live_BgcvT6syOzTtmUIr2mUy8fjQ8nNGwCcTqqWNhfqEGHHKQ37uZLaLFM5V6dQ5aBtEU42OdSE3Pfv9Bj5L";

async function generateImage() {
  const prompt = document.getElementById("prompt").value.trim();
  const resultDiv = document.getElementById("result");
  const logDiv = document.getElementById("log");
  logDiv.innerText = "";

  if (!prompt) { 
    alert("Enter prompt"); 
    return; 
  }

  resultDiv.innerHTML = "⏳ Sending request...";
  logDiv.innerText += "Sending request...\n";

  try {
    const resp = await fetch("https://api.magichour.ai/v1/ai-image-generator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        image_count: 1,
        orientation: "square",
        style: { prompt: prompt },
        name: "minimal-test",
        wait_for_completion: false
      })
    });

    const data = await resp.json();
    logDiv.innerText += "Initial response:\n" + JSON.stringify(data, null, 2) + "\n";

    if (!data.id) { 
      resultDiv.innerHTML = "❌ No generation ID"; 
      return; 
    }

    const genId = data.id;
    resultDiv.innerHTML = "⏳ Generation started, waiting for image...";

    const interval = setInterval(async () => {
      const statusResp = await fetch(`https://api.magichour.ai/v1/ai-image-generator/${genId}`, {
        headers: { "Authorization": `Bearer ${API_KEY}` }
      });
      const statusData = await statusResp.json();
      logDiv.innerText += "Polling response:\n" + JSON.stringify(statusData, null, 2) + "\n";

      if (statusData.outputs && statusData.outputs.length > 0 && statusData.outputs[0].url) {
        clearInterval(interval);
        const imageUrl = statusData.outputs[0].url;
        resultDiv.innerHTML = `<h3>Generated Image</h3><img src="${imageUrl}" alt="Generated" width="400">`;
        logDiv.innerText += "✅ Image ready and displayed.\n";
      } else if (statusData.status === "failed") {
        clearInterval(interval);
        resultDiv.innerHTML = "❌ Image generation failed.";
        logDiv.innerText += "⚠️ Generation failed.\n";
      } else {
        resultDiv.innerHTML = "⏳ Generating image... please wait.";
      }
    }, 2000);

  } catch (err) {
    resultDiv.innerHTML = "⚠️ Error occurred!";
    logDiv.innerText += "Error: " + err.message + "\n";
  }
}
        const interval = setInterval(async () => {
            const statusResp = await fetch(`https://api.magichour.ai/v1/ai-image-generator/${genId}`, {
                headers: { "Authorization": `Bearer ${API_KEY}` }
            });
            const statusData = await statusResp.json();
            logDiv.innerText += JSON.stringify(statusData, null, 2) + "\n";

            if (statusData.outputs && statusData.outputs[0]?.url) {
                clearInterval(interval);
                const url = statusData.outputs[0].url;
                resultDiv.innerHTML = `<img src="${url}" alt="Generated Image" width="400">`;
                logDiv.innerText += "✅ Image ready\n";
            } else if (statusData.status === "failed") {
                clearInterval(interval);
                resultDiv.innerHTML = "❌ Generation failed";
            }
        }, 2000);

    } catch (err) {
        logDiv.innerText += "Error: " + err + "\n";
        resultDiv.innerHTML = "⚠️ Error occurred";
    }
                  }
