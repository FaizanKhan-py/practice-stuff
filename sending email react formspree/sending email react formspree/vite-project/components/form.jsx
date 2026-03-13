import { useState } from "react";

export default function Form() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const form = e.target;

    try {
      const res = await fetch("https://formspree.io/f/mbdalgvw", {
        method: "POST",
        headers: {
          "Accept": "application/json"
        },
        body: new FormData(form)
      });

      const data = await res.json();

      if (data.ok) {
        setStatus("✅ Message sent successfully!");
        form.reset();
      } else {
        setStatus("❌ Something went wrong. Try again.");
      }
    } catch (err) {
      setStatus("❌ Network error. Please try later.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <input
        type="text"
        name="name"
        placeholder="Your name"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Your email"
        required
      />

      <textarea
        name="message"
        placeholder="Your message"
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send"}
      </button>

      {status && <p>{status}</p>}
    </form>
  );
}
