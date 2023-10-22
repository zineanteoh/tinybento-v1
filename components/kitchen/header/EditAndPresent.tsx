import React, { useState } from "react";
import styles from "./EditAndPresent.module.css";

enum KitchenMode {
  Edit = "edit",
  Present = "present",
}

const EditAndPresent = () => {
  const [mode, setMode] = useState<KitchenMode>(KitchenMode.Edit);

  // switch between edit and present mode
  const switchMode = () => {
    if (mode === KitchenMode.Edit) {
      setMode(KitchenMode.Present);
    } else {
      setMode(KitchenMode.Edit);
    }
  };

  return (
    <div className={`no-select ${styles.container}`} onClick={switchMode}>
      {/* The icon in the middle */}
      <div
        className={styles.iconContainer}
        style={{ backgroundColor: computeEditPresentIconColor(mode) }}
      >
        <div className={computeEditPresentIconStyle(mode, KitchenMode.Edit)}>
          {IconEdit}
        </div>
        <div className={computeEditPresentIconStyle(mode, KitchenMode.Present)}>
          {IconPresent}
        </div>
      </div>

      {/* The text */}
      <div className={styles.textContainer}>
        <div>Edit</div>
        <br />
        <div>Present</div>
      </div>

      {/* The left-right color overlay */}
      <div
        className={styles.circularOverlay}
        style={{
          backgroundColor: computeEditPresentOverlay(mode),
          left: computeEditPresentOverlayPosition(mode),
        }}
      />
    </div>
  );
};

export default EditAndPresent;

// helper function
const computeEditPresentIconColor = (mode: KitchenMode) => {
  return mode === KitchenMode.Edit ? "#FFDC62" : "#88DD61";
};

const computeEditPresentIconStyle = (
  mode: KitchenMode,
  isEqual: KitchenMode
) => {
  return `${styles.icon} ${mode === isEqual && styles.active}`;
};

const computeEditPresentOverlay = (mode: KitchenMode) => {
  return mode === KitchenMode.Edit ? "#FFE896" : "#CDFFC5";
};

const computeEditPresentOverlayPosition = (mode: KitchenMode) => {
  return mode === KitchenMode.Edit ? "0%" : "calc(50% - 20px)";
};

const IconEdit = (
  <svg viewBox="0 0 43 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="Union">
      <mask
        id="path-1-outside-1_499_568"
        maskUnits="userSpaceOnUse"
        x="-7.65685"
        y="-4.79693"
        width="56.5685"
        height="56.5685"
        fill="black"
      >
        <rect
          fill="white"
          x="-7.65685"
          y="-4.79693"
          width="56.5685"
          height="56.5685"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M28.0586 10.3003L32.4586 5.90025C28.4972 4.13088 23.6868 4.87157 20.4361 8.12233C17.1761 11.3824 16.4404 16.2108 18.2292 20.1787C18.0971 20.2789 17.9703 20.3892 17.8498 20.5097L5.4869 32.8726C4.0585 34.301 4.0585 36.6169 5.4869 38.0453C6.91531 39.4737 9.2312 39.4737 10.6596 38.0453L23.0225 25.6824C23.1109 25.594 23.1938 25.5022 23.2713 25.4075C27.3027 27.4057 32.3242 26.7259 35.6819 23.3682C38.9329 20.1173 39.6735 15.3066 37.9037 11.345L33.5035 15.7452C31.9999 17.2488 29.5622 17.2488 28.0586 15.7452C26.555 14.2417 26.555 11.8039 28.0586 10.3003Z"
        />
      </mask>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28.0586 10.3003L32.4586 5.90025C28.4972 4.13088 23.6868 4.87157 20.4361 8.12233C17.1761 11.3824 16.4404 16.2108 18.2292 20.1787C18.0971 20.2789 17.9703 20.3892 17.8498 20.5097L5.4869 32.8726C4.0585 34.301 4.0585 36.6169 5.4869 38.0453C6.91531 39.4737 9.2312 39.4737 10.6596 38.0453L23.0225 25.6824C23.1109 25.594 23.1938 25.5022 23.2713 25.4075C27.3027 27.4057 32.3242 26.7259 35.6819 23.3682C38.9329 20.1173 39.6735 15.3066 37.9037 11.345L33.5035 15.7452C31.9999 17.2488 29.5622 17.2488 28.0586 15.7452C26.555 14.2417 26.555 11.8039 28.0586 10.3003Z"
        fill="white"
      />
      <path
        d="M32.4586 5.90025L35.287 8.72868C36.218 7.79773 36.6312 6.46829 36.3921 5.17363C36.1529 3.87898 35.292 2.78491 34.0899 2.248L32.4586 5.90025ZM28.0586 10.3003L25.2301 7.47187L28.0586 10.3003ZM20.4361 8.12233L23.2645 10.9508L20.4361 8.12233ZM18.2292 20.1787L20.6465 23.3657C22.1322 22.2388 22.6421 20.2348 21.8758 18.5348L18.2292 20.1787ZM17.8498 20.5097L15.0214 17.6813L17.8498 20.5097ZM5.4869 32.8726L8.31533 35.701L8.31533 35.701L5.4869 32.8726ZM5.4869 38.0453L2.65848 40.8737L5.4869 38.0453ZM10.6596 38.0453L13.488 40.8737L13.488 40.8737L10.6596 38.0453ZM23.0225 25.6824L20.1941 22.854L23.0225 25.6824ZM23.2713 25.4075L25.0476 21.8236C23.3764 20.9952 21.3545 21.4319 20.1741 22.8762L23.2713 25.4075ZM37.9037 11.345L41.5559 9.71353C41.0189 8.5115 39.9248 7.65066 38.6302 7.41155C37.3356 7.17245 36.0062 7.58568 35.0753 8.5166L37.9037 11.345ZM29.6302 3.07182L25.2301 7.47187L30.887 13.1287L35.287 8.72868L29.6302 3.07182ZM23.2645 10.9508C25.3046 8.91063 28.3293 8.43678 30.8273 9.55251L34.0899 2.248C28.665 -0.175024 22.069 0.832518 17.6077 5.29391L23.2645 10.9508ZM21.8758 18.5348C20.7479 16.0329 21.2185 12.9967 23.2645 10.9508L17.6077 5.29391C13.1336 9.76799 12.133 16.3888 14.5826 21.8226L21.8758 18.5348ZM20.6783 23.3381C20.6696 23.3468 20.659 23.3562 20.6465 23.3657L15.8119 16.9917C15.5352 17.2016 15.271 17.4316 15.0214 17.6813L20.6783 23.3381ZM8.31533 35.701L20.6783 23.3381L15.0214 17.6813L2.65848 30.0442L8.31533 35.701ZM8.31533 35.2169C8.44903 35.3506 8.44903 35.5673 8.31533 35.701L2.65848 30.0442C-0.33202 33.0347 -0.332023 37.8832 2.65848 40.8737L8.31533 35.2169ZM7.83117 35.2169C7.96487 35.0832 8.18164 35.0832 8.31533 35.2169L2.65848 40.8737C5.64897 43.8642 10.4975 43.8642 13.488 40.8737L7.83117 35.2169ZM20.1941 22.854L7.83117 35.2169L13.488 40.8737L25.8509 28.5108L20.1941 22.854ZM20.1741 22.8762C20.181 22.8677 20.1878 22.8603 20.1941 22.854L25.8509 28.5108C26.034 28.3278 26.2066 28.1368 26.3684 27.9388L20.1741 22.8762ZM32.8535 20.5398C30.746 22.6472 27.5876 23.0825 25.0476 21.8236L21.4949 28.9914C27.0177 31.7288 33.9024 30.8045 38.5104 26.1966L32.8535 20.5398ZM34.2516 12.9765C35.3675 15.4746 34.8937 18.4995 32.8535 20.5398L38.5104 26.1966C42.972 21.735 43.9794 15.1386 41.5559 9.71353L34.2516 12.9765ZM36.332 18.5737L40.7322 14.1735L35.0753 8.5166L30.6751 12.9168L36.332 18.5737ZM25.2301 18.5737C28.2958 21.6393 33.2663 21.6393 36.332 18.5737L30.6751 12.9168C30.7336 12.8583 30.8285 12.8583 30.887 12.9168L25.2301 18.5737ZM25.2301 7.47187C22.1645 10.5375 22.1645 15.508 25.2301 18.5737L30.887 12.9168C30.9455 12.9753 30.9455 13.0702 30.887 13.1287L25.2301 7.47187Z"
        fill="black"
        mask="url(#path-1-outside-1_499_568)"
      />
    </g>
  </svg>
);

const IconPresent = (
  <svg viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M36.25 24.357C36.8688 23.9998 37.25 23.3395 37.25 22.625C37.25 21.9105 36.8688 21.2502 36.25 20.893L5.3125 3.03117C4.6937 2.67391 3.9313 2.67391 3.3125 3.03117C2.6937 3.38844 2.3125 4.04869 2.3125 4.76322L2.3125 40.4868C2.3125 41.2013 2.6937 41.8616 3.3125 42.2188C3.9313 42.5761 4.69369 42.5761 5.3125 42.2188L36.25 24.357Z"
      fill="white"
      stroke="black"
      strokeWidth="4"
      strokeLinejoin="round"
      transform="translate(5 0)"
    />
  </svg>
);