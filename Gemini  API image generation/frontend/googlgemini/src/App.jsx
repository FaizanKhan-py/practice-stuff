import React, { useState } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt) return;

    setLoading(true);
    setImage(null);

    try {
      const res = await fetch("http://localhost:5000/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (data.image) {
        setImage(`data:image/png;base64,${data.image}`);
      }
    } catch (error) {
      alert("Error generating image");
    }

    setLoading(false);
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = image;
    link.download = "gemini-image.png";
    link.click();
  };

  return (
    <div style={styles.container}>
      <h1>Gemini AI Image Generator</h1>

      <input
        type="text"
        placeholder="Enter your prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={styles.input}
      />

      <button onClick={generateImage} style={styles.button}>
        {loading ? "Generating..." : "Generate"}
      </button>

      {image && (
        <div style={styles.imageBox}>
          <img src={image} alt="Generated" style={styles.image} />
          <button onClick={downloadImage} style={styles.downloadBtn}>
            Download Image
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "60px",
    fontFamily: "Arial",
  },
  input: {
    padding: "10px",
    width: "350px",
    marginRight: "10px",
  },
  button: {
    padding: "10px 20px",
    cursor: "pointer",
  },
  imageBox: {
    marginTop: "30px",
  },
  image: {
    maxWidth: "500px",
    borderRadius: "12px",
    display: "block",
    margin: "0 auto 15px",
  },
  downloadBtn: {
    padding: "8px 16px",
    cursor: "pointer",
  },
};

export default App;
