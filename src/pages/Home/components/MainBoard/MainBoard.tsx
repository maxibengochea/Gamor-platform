import { useState } from "react";
import GameList from "../GameList/GameList";
import "./MainBoard.css";
import type { FortnitePromoImg } from "../../../../types/fornite-promo-img.type";
import { useTheme } from "../../../../store/useTheme.store";

type InlineStyles = {
  colorStreamingText: string;
  backGroundColorFortnitePromo: string;
  colorDateFortniteNewSeason: string;
  boxShadowCreateAccount: string;
  backgroundColorCreateAccount: string;
  colorStrongTextSection1: string;
  colorNotStrongTextSection1: string;
  colorAuthButton: string;
};

function MainBoard() {
  const [gameImage, setGameImage] = useState<FortnitePromoImg | null>(null); //imagen de background
  const isDarkTheme = useTheme((state) => state.isDarkTheme); //saber el tema de fondo

  const inlineStyles: InlineStyles = {
    colorStreamingText: isDarkTheme ? "blueviolet" : "orange",
    backGroundColorFortnitePromo: isDarkTheme ? "blueviolet" : "orange",
    colorDateFortniteNewSeason: isDarkTheme ? "blueviolet" : "orange",
    boxShadowCreateAccount: isDarkTheme ? "#1c2833 " : "gray",
    backgroundColorCreateAccount: isDarkTheme ? "#424949" : "white",
    colorStrongTextSection1: isDarkTheme ? "white" : "black",
    colorNotStrongTextSection1: isDarkTheme ? "darkgray" : "black",
    colorAuthButton: isDarkTheme ? "white" : "black",
  };

  return (
    <section className="main-board-content">
      <article className="main-board-section-1">
        <div className="section-1-text-container">
          <div style={{ marginTop: "10%", justifySelf: "flex-start" }}>
            <span>start</span>
          </div>
          <div>
            <span style={{ color: inlineStyles.colorStreamingText }}>
              streaming
            </span>
          </div>
          <div>
            <span>games</span>
          </div>
          <div>
            <span>differently</span>
          </div>
        </div>
        <span>
          gamor now has{" "}
          <strong
            style={{
              color: inlineStyles.colorStrongTextSection1,
            }}
          >
            stream party
          </strong>{" "}
          platform
        </span>
        <div className="section-1-auth-content">
          <span
            className="button"
            style={{
              borderRadius: "15px",
              padding: "8px",
              boxShadow: `1px 1px 5px ${inlineStyles.boxShadowCreateAccount}`,
              color: inlineStyles.colorAuthButton,
              backgroundColor: inlineStyles.backgroundColorCreateAccount,
            }}
          >
            Create Account
          </span>
          <span
            className="button"
            style={{ color: inlineStyles.colorAuthButton }}
          >
            Sign In
          </span>
        </div>
      </article>
      <article
        className="fortnite-promo-content"
        style={{
          position: gameImage ? "relative" : undefined,
          backgroundColor: gameImage
            ? undefined
            : inlineStyles.backGroundColorFortnitePromo,
        }}
      >
        {gameImage && (
          <img
            src={gameImage.src}
            style={{ ...gameImage, position: "absolute", opacity: 0.8 }}
          />
        )}
        <h2
          style={{
            marginTop: "25%",
            color: "white",
            zIndex: 2,
          }}
        >
          Fortnite New Season
        </h2>
        <small style={{ color: "#424949", zIndex: 2, fontWeight: "bold" }}>
          Join Live Stream
        </small>
        <span
          style={{
            marginTop: "15%",
            fontSize: "150%",
            padding: "5px 8px",
            borderRadius: "25px",
            backgroundColor: "whitesmoke",
            color: inlineStyles.colorDateFortniteNewSeason,
            fontWeight: "bolder",
            zIndex: 2,
          }}
        >
          11 : 45
        </span>
      </article>
      <GameList updateGameImage={setGameImage} />
    </section>
  );
}

export default MainBoard;
