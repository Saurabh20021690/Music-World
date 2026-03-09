import React from "react";
import Dialog from "../../components/Dialog";

const Premium = () => {
  const plans = [
    {
      name: "Individual",
      price: "₹119 / month",
      features: [
        "Ad-free music",
        "Download songs",
        "Play anywhere",
        "High quality audio",
      ],
    },
    {
      name: "Student",
      price: "₹59 / month",
      features: ["All Individual features", "Discount for students"],
    },
    {
      name: "Family",
      price: "₹179 / month",
      features: ["Up to 6 accounts", "Parental control", "Shared playlists"],
    },
  ];

  return (
    <Dialog title="Upgrade to Premium">
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {plans.map((plan, index) => (
          <div
            key={index}
            style={{
              background: "#181818",
              padding: "20px",
              borderRadius: "10px",
              flex: "1 1 250px",
            }}
          >
            <h2>{plan.name}</h2>
            <h3 style={{ color: "#1db954" }}>{plan.price}</h3>

            <ul style={{ marginTop: "10px" }}>
              {plan.features.map((f, i) => (
                <li key={i}>✓ {f}</li>
              ))}
            </ul>

            <button
              style={{
                marginTop: "15px",
                background: "#1db954",
                border: "none",
                padding: "10px 20px",
                borderRadius: "20px",
                cursor: "pointer",
                color: "black",
                fontWeight: "600",
              }}
            >
              Get Premium
            </button>
          </div>
        ))}
      </div>
    </Dialog>
  );
};

export default Premium;