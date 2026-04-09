function homePage() {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Devbuilds Backend</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Inter", sans-serif;
        }

        body {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a, #1e293b, #111827);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .container {
          max-width: 900px;
          width: 100%;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(18px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 28px;
          padding: 50px 40px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
          text-align: center;
        }

        .badge {
          display: inline-block;
          padding: 8px 16px;
          border-radius: 999px;
          background: rgba(59, 130, 246, 0.18);
          color: #93c5fd;
          font-size: 14px;
          margin-bottom: 20px;
          border: 1px solid rgba(59, 130, 246, 0.25);
        }

        h1 {
          font-size: 3rem;
          margin-bottom: 16px;
          line-height: 1.2;
        }

        h1 span {
          color: #60a5fa;
        }

        p {
          font-size: 1.1rem;
          color: #cbd5e1;
          max-width: 700px;
          margin: 0 auto 30px;
          line-height: 1.8;
        }

        .status {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 20px;
          border-radius: 14px;
          background: rgba(34, 197, 94, 0.12);
          color: #86efac;
          border: 1px solid rgba(34, 197, 94, 0.2);
          font-weight: 600;
          margin-bottom: 35px;
        }

        .dot {
          width: 10px;
          height: 10px;
          background: #22c55e;
          border-radius: 50%;
          box-shadow: 0 0 12px #22c55e;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 18px;
          margin-top: 20px;
        }

        .card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 24px;
          text-align: left;
          transition: all 0.3s ease;
        }

        .card:hover {
          transform: translateY(-6px);
          border-color: rgba(96, 165, 250, 0.35);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
        }

        .card h3 {
          font-size: 1.1rem;
          margin-bottom: 10px;
          color: #f8fafc;
        }

        .card p {
          font-size: 0.95rem;
          color: #94a3b8;
          margin: 0;
          line-height: 1.7;
        }

        .footer {
          margin-top: 35px;
          font-size: 0.9rem;
          color: #64748b;
        }

        @media (max-width: 640px) {
          .container {
            padding: 35px 22px;
          }

          h1 {
            font-size: 2.2rem;
          }

          p {
            font-size: 1rem;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="badge">🚀 Devbuilds API</div>

        <h1>Welcome to <span>Devbuilds Backend</span></h1>

        <p>
          Your backend server is up and running successfully. This is the main
          entry point of your API where you can confirm the system is active,
          healthy, and ready to serve requests.
        </p>

        <div class="status">
          <div class="dot"></div>
          Server Status: Running Successfully
        </div>

        <div class="grid">
          <div class="card">
            <h3>⚡ Fast API Responses</h3>
            <p>
              Built to handle requests quickly and efficiently for your frontend
              and services.
            </p>
          </div>

          <div class="card">
            <h3>🔒 Secure Backend</h3>
            <p>
              Structured to support authentication, protected routes, and safe
              data handling.
            </p>
          </div>

          <div class="card">
            <h3>🛠 Ready to Build</h3>
            <p>
              Start adding your routes, controllers, database logic, and core
              app features from here.
            </p>
          </div>
        </div>

        <div class="footer">
          Made with ❤️ for Devbuilds
        </div>
      </div>
    </body>
    </html>
  `;
}

export default homePage;