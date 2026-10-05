/* =========================================================
   GRAD-005 — ACADEMIC CASE FILE

   Change client data ONLY here.
========================================================= */

const GRADUATION = {

  /* =========================
     Graduate
  ========================= */

  graduateName:
    "Mohammed Ahmed",

  degree:
    "Bachelor of Medicine",

  faculty:
    "College of Medicine",

  department:
    "General Medicine",

  university:
    "University of Mosul",

  classYear:
    "Class of 2027",


  /* =========================
     Academic Case
  ========================= */

  caseId:
    "ACF-2027-005",

  academicHistory: [

    {
      title:
        "LECTURES",

      subtitle:
        "Academic coursework completed"
    },

    {
      title:
        "CLINICAL ROUNDS",

      subtitle:
        "Clinical training requirements completed"
    },

    {
      title:
        "EXAMINATIONS",

      subtitle:
        "Required examinations successfully passed"
    },

    {
      title:
        "INTERNSHIP",

      subtitle:
        "Final professional training completed"
    }

  ],


  /* =========================
     Message
  ========================= */

  tagline:
    "Academic case completed. The celebration begins next.",


  /* =========================
     Date
  ========================= */

  startAt:
    "2027-07-15T18:00:00+03:00",

  endAt:
    "2027-07-15T21:00:00+03:00",

  timeZone:
    "Asia/Baghdad",


  /* =========================
     Venue
  ========================= */

  venue:
    "Grand Celebration Hall",

  address:
    "Mosul, Nineveh",

  city:
    "Mosul",

  country:
    "Iraq",


  /* =========================
     URLs
  ========================= */

  mapsUrl:
    "",

  shareUrl:
    ""

};


/* =========================================================
   ELEMENTS
========================================================= */

const historyList =
  document.getElementById(
    "historyList"
  );

const reviewButton =
  document.getElementById(
    "reviewButton"
  );

const consoleDot =
  document.getElementById(
    "consoleDot"
  );

const consoleMessage =
  document.getElementById(
    "consoleMessage"
  );

const headerStatus =
  document.getElementById(
    "headerStatus"
  );

const ecgState =
  document.getElementById(
    "ecgState"
  );

const ecgPath =
  document.getElementById(
    "ecgPath"
  );

const diagnosisResult =
  document.getElementById(
    "diagnosisResult"
  );

const diagnosisSeal =
  document.getElementById(
    "diagnosisSeal"
  );

const caseClosed =
  document.getElementById(
    "caseClosed"
  );

const mapsButton =
  document.getElementById(
    "mapsButton"
  );

const calendarButton =
  document.getElementById(
    "calendarButton"
  );

const shareButton =
  document.getElementById(
    "shareButton"
  );

const shareFeedback =
  document.getElementById(
    "shareFeedback"
  );

const reducedMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


/* =========================================================
   STATE
========================================================= */

let reviewRunning =
  false;

let reviewCompleted =
  false;

let countdownTimer =
  null;


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  initialize
);


function initialize() {

  applyData();

  buildHistory();

  setupDate();

  setupMaps();

  setupCalendar();

  setupShare();

  setupReview();

  prepareECG();

  updateCountdown();

  countdownTimer =
    window.setInterval(
      updateCountdown,
      1000
    );


  if (reducedMotion) {

    completeReviewImmediately();

  }

}


/* =========================================================
   DATA
========================================================= */

function applyData() {

  const fields = {

    graduateName:
      GRADUATION.graduateName,

    degree:
      GRADUATION.degree,

    faculty:
      GRADUATION.faculty,

    university:
      GRADUATION.university,

    classYear:
      GRADUATION.classYear,

    caseId:
      GRADUATION.caseId,

    venue:
      GRADUATION.venue,

    tagline:
      GRADUATION.tagline

  };


  Object.entries(fields)
    .forEach(
      ([field, value]) => {

        document
          .querySelectorAll(
            `[data-field="${field}"]`
          )
          .forEach(
            element => {

              element.textContent =
                value || "—";

            }
          );

      }
    );


  document.title =
    `${GRADUATION.graduateName} — Academic Case File`;


  const ogTitle =
    document.querySelector(
      'meta[property="og:title"]'
    );


  const ogDescription =
    document.querySelector(
      'meta[property="og:description"]'
    );


  if (ogTitle) {

    ogTitle.setAttribute(
      "content",
      `${GRADUATION.graduateName} — Graduation Invitation`
    );

  }


  if (ogDescription) {

    ogDescription.setAttribute(
      "content",
      `Academic case completed. Final diagnosis: Graduation — ${GRADUATION.graduateName}.`
    );

  }

}


/* =========================================================
   HISTORY
========================================================= */

function buildHistory() {

  historyList.innerHTML =
    "";


  GRADUATION.academicHistory
    .forEach(
      (item, index) => {

        const row =
          document.createElement(
            "article"
          );


        row.className =
          "history-row";


        row.innerHTML = `
          <span class="history-index">
            ${String(index + 1).padStart(2, "0")}
          </span>

          <div class="history-copy">

            <strong>
              ${escapeHTML(item.title)}
            </strong>

            <span>
              ${escapeHTML(item.subtitle)}
            </span>

          </div>

          <div class="history-result">

            <span class="history-result-label">
              PENDING
            </span>

            <svg
              viewBox="0 0 32 32"
              aria-hidden="true"
            >

              <circle
                cx="16"
                cy="16"
                r="13"
              ></circle>

              <path
                class="history-check"
                d="M9.5 16.5L14 21L23 11.5"
              ></path>

            </svg>

          </div>
        `;


        historyList.appendChild(
          row
        );

      }
    );

}


/* =========================================================
   ECG
========================================================= */

function prepareECG() {

  const length =
    ecgPath.getTotalLength();


  ecgPath.style.strokeDasharray =
    `${length}`;


  ecgPath.style.strokeDashoffset =
    `${length}`;

}


/* =========================================================
   REVIEW
========================================================= */

function setupReview() {

  reviewButton.addEventListener(
    "click",
    () => {

      if (reviewRunning) {
        return;
      }


      if (reviewCompleted) {

        document
          .getElementById(
            "diagnosis"
          )
          .scrollIntoView({
            behavior:
              reducedMotion
                ? "auto"
                : "smooth"
          });


        return;

      }


      runReview();

    }
  );

}


/* =========================================================
   GSAP REVIEW
========================================================= */

function runReview() {

  if (
    reducedMotion ||
    typeof gsap ===
      "undefined"
  ) {

    completeReviewImmediately();

    return;

  }


  reviewRunning =
    true;


  reviewButton.disabled =
    true;


  consoleDot.classList.add(
    "is-active"
  );


  headerStatus.textContent =
    "REVIEWING";


  ecgState.textContent =
    "ACTIVE";


  consoleMessage.textContent =
    "Running academic case review...";


  const rows =
    [
      ...document.querySelectorAll(
        ".history-row"
      )
    ];


  const pathLength =
    ecgPath.getTotalLength();


  const timeline =
    gsap.timeline({

      onComplete: () => {

        reviewRunning =
          false;

        reviewCompleted =
          true;

        reviewButton.disabled =
          false;

        reviewButton
          .querySelector("span")
          .textContent =
            "VIEW FINAL DIAGNOSIS";

      }

    });


  timeline

    .to(
      ecgPath,
      {

        strokeDashoffset: 0,

        duration: 2.4,

        ease:
          "power1.inOut"

      },
      0
    );


  rows.forEach(
    (row, index) => {

      const check =
        row.querySelector(
          ".history-check"
        );


      const label =
        row.querySelector(
          ".history-result-label"
        );


      const start =
        0.4 +
        index * 0.55;


      timeline

        .call(
          () => {

            consoleMessage.textContent =
              `Verifying ${GRADUATION.academicHistory[index].title.toLowerCase()}...`;

          },
          null,
          start
        )

        .to(
          check,
          {

            strokeDashoffset: 0,

            duration: 0.32,

            ease:
              "power2.out"

          },
          start + 0.15
        )

        .call(
          () => {

            row.classList.add(
              "is-complete"
            );


            label.textContent =
              "VERIFIED";

          },
          null,
          start + 0.32
        );

    }
  );


  timeline

    .call(
      () => {

        consoleMessage.textContent =
          "All academic indicators verified.";

      },
      null,
      2.75
    )

    .to(
      {},
      {
        duration: 0.35
      }
    )

    .call(
      () => {

        headerStatus.textContent =
          "FINAL RESULT";


        ecgState.textContent =
          "STABLE";


        diagnosisResult.textContent =
          "GRADUATION";

      }
    )

    .to(
      diagnosisSeal,
      {

        opacity: 1,

        scale: 1,

        duration: 0.55,

        ease:
          "back.out(1.4)"

      }
    )

    .to(
      caseClosed,
      {

        opacity: 1,

        y: 0,

        duration: 0.4

      },
      "-=0.15"
    )

    .call(
      () => {

        consoleDot.classList.remove(
          "is-active"
        );


        consoleDot.classList.add(
          "is-success"
        );


        consoleMessage.textContent =
          "Academic case closed successfully.";


        headerStatus.textContent =
          "CASE CLOSED";

      }
    );

}


/* =========================================================
   IMMEDIATE STATE
========================================================= */

function completeReviewImmediately() {

  const rows =
    document.querySelectorAll(
      ".history-row"
    );


  rows.forEach(
    row => {

      row.classList.add(
        "is-complete"
      );


      const check =
        row.querySelector(
          ".history-check"
        );


      const label =
        row.querySelector(
          ".history-result-label"
        );


      check.style.strokeDashoffset =
        "0";


      label.textContent =
        "VERIFIED";

    }
  );


  ecgPath.style.strokeDashoffset =
    "0";


  diagnosisResult.textContent =
    "GRADUATION";


  diagnosisSeal.style.opacity =
    "1";


  diagnosisSeal.style.transform =
    "scale(1)";


  caseClosed.style.opacity =
    "1";


  headerStatus.textContent =
    "CASE CLOSED";


  ecgState.textContent =
    "STABLE";


  consoleDot.classList.add(
    "is-success"
  );


  consoleMessage.textContent =
    "Academic case closed successfully.";


  reviewCompleted =
    true;


  reviewButton
    .querySelector("span")
    .textContent =
      "VIEW FINAL DIAGNOSIS";

}


/* =========================================================
   DATE
========================================================= */

function setupDate() {

  const date =
    new Date(
      GRADUATION.startAt
    );


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {

    return;

  }


  const monthFormatter =
    new Intl.DateTimeFormat(
      "en",
      {
        month: "short",
        timeZone:
          GRADUATION.timeZone
      }
    );


  const dayFormatter =
    new Intl.DateTimeFormat(
      "en",
      {
        day: "2-digit",
        timeZone:
          GRADUATION.timeZone
      }
    );


  const yearFormatter =
    new Intl.DateTimeFormat(
      "en",
      {
        year: "numeric",
        timeZone:
          GRADUATION.timeZone
      }
    );


  const dateFormatter =
    new Intl.DateTimeFormat(
      "en",
      {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone:
          GRADUATION.timeZone
      }
    );


  const timeFormatter =
    new Intl.DateTimeFormat(
      "en",
      {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone:
          GRADUATION.timeZone
      }
    );


  document.getElementById(
    "ceremonyMonth"
  ).textContent =
    monthFormatter
      .format(date)
      .toUpperCase();


  document.getElementById(
    "ceremonyDay"
  ).textContent =
    dayFormatter.format(date);


  document.getElementById(
    "ceremonyYear"
  ).textContent =
    yearFormatter.format(date);


  document.getElementById(
    "formattedDate"
  ).textContent =
    dateFormatter.format(date);


  document.getElementById(
    "formattedTime"
  ).textContent =
    timeFormatter.format(date);


  document.getElementById(
    "fullAddress"
  ).textContent =
    [
      GRADUATION.address,
      GRADUATION.country
    ]
      .filter(Boolean)
      .join(", ");

}


/* =========================================================
   COUNTDOWN
========================================================= */

function updateCountdown() {

  const start =
    new Date(
      GRADUATION.startAt
    ).getTime();


  const end =
    new Date(
      GRADUATION.endAt
    ).getTime();


  const now =
    Date.now();


  if (
    Number.isNaN(start) ||
    Number.isNaN(end)
  ) {

    return;

  }


  if (
    now >= start
  ) {

    setCountdown(
      0,
      0,
      0,
      0
    );


    if (
      now >= end
    ) {

      clearInterval(
        countdownTimer
      );

    }


    return;

  }


  const difference =
    start -
    now;


  const days =
    Math.floor(
      difference /
      86400000
    );


  const hours =
    Math.floor(
      (
        difference %
        86400000
      ) /
      3600000
    );


  const minutes =
    Math.floor(
      (
        difference %
        3600000
      ) /
      60000
    );


  const seconds =
    Math.floor(
      (
        difference %
        60000
      ) /
      1000
    );


  setCountdown(
    days,
    hours,
    minutes,
    seconds
  );

}


function setCountdown(
  days,
  hours,
  minutes,
  seconds
) {

  document.getElementById(
    "days"
  ).textContent =
    pad(days);


  document.getElementById(
    "hours"
  ).textContent =
    pad(hours);


  document.getElementById(
    "minutes"
  ).textContent =
    pad(minutes);


  document.getElementById(
    "seconds"
  ).textContent =
    pad(seconds);

}


function pad(
  value
) {

  return String(value)
    .padStart(
      2,
      "0"
    );

}


/* =========================================================
   MAPS
========================================================= */

function setupMaps() {

  mapsButton.href =
    getMapsUrl();

}


function getMapsUrl() {

  if (
    GRADUATION.mapsUrl &&
    GRADUATION.mapsUrl.trim()
  ) {

    return GRADUATION.mapsUrl;

  }


  const query =
    [
      GRADUATION.venue,
      GRADUATION.address,
      GRADUATION.city,
      GRADUATION.country
    ]
      .filter(Boolean)
      .join(", ");


  return (
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(query)
  );

}


/* =========================================================
   CALENDAR
========================================================= */

function setupCalendar() {

  calendarButton.addEventListener(
    "click",
    downloadICS
  );

}


function downloadICS() {

  const start =
    new Date(
      GRADUATION.startAt
    );


  const end =
    new Date(
      GRADUATION.endAt
    );


  if (
    Number.isNaN(
      start.getTime()
    ) ||
    Number.isNaN(
      end.getTime()
    )
  ) {

    return;

  }


  const title =
    `${GRADUATION.graduateName} Graduation Celebration`;


  const location =
    [
      GRADUATION.venue,
      GRADUATION.address,
      GRADUATION.city,
      GRADUATION.country
    ]
      .filter(Boolean)
      .join(", ");


  const invitationUrl =
    getShareUrl();


  const description =
    [
      `Graduation celebration for ${GRADUATION.graduateName}.`,
      GRADUATION.degree,
      GRADUATION.university,
      invitationUrl
        ? `Invitation: ${invitationUrl}`
        : ""
    ]
      .filter(Boolean)
      .join("\\n");


  const content =
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//InviteUs//AcademicCaseFile//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${Date.now()}@inviteus.party
DTSTAMP:${formatICSDate(new Date())}
DTSTART:${formatICSDate(start)}
DTEND:${formatICSDate(end)}
SUMMARY:${escapeICS(title)}
DESCRIPTION:${escapeICS(description)}
LOCATION:${escapeICS(location)}
URL:${escapeICS(invitationUrl)}
END:VEVENT
END:VCALENDAR`;


  const blob =
    new Blob(
      [content],
      {
        type:
          "text/calendar;charset=utf-8"
      }
    );


  const url =
    URL.createObjectURL(
      blob
    );


  const link =
    document.createElement(
      "a"
    );


  link.href =
    url;


  link.download =
    "graduation-celebration.ics";


  document.body.appendChild(
    link
  );


  link.click();


  link.remove();


  URL.revokeObjectURL(
    url
  );

}


function formatICSDate(
  date
) {

  return date
    .toISOString()
    .replace(
      /[-:]/g,
      ""
    )
    .replace(
      /\.\d{3}/,
      ""
    );

}


function escapeICS(
  value = ""
) {

  return String(value)

    .replace(
      /\\/g,
      "\\\\"
    )

    .replace(
      /,/g,
      "\\,"
    )

    .replace(
      /;/g,
      "\\;"
    )

    .replace(
      /\n/g,
      "\\n"
    );

}


/* =========================================================
   SHARE
========================================================= */

function setupShare() {

  shareButton.addEventListener(
    "click",
    shareInvitation
  );

}


async function shareInvitation() {

  const url =
    getShareUrl();


  const title =
    `${GRADUATION.graduateName} — Graduation Invitation`;


  const text =
    `Academic case completed. Final diagnosis: Graduation. Join us in celebrating ${GRADUATION.graduateName}, ${GRADUATION.classYear}.`;


  try {

    if (
      navigator.share
    ) {

      await navigator.share({
        title,
        text,
        url
      });


      showShareFeedback(
        "Invitation shared successfully."
      );


      return;

    }


    if (
      navigator.clipboard &&
      window.isSecureContext
    ) {

      await navigator.clipboard.writeText(
        url
      );


      showShareFeedback(
        "Invitation link copied."
      );


      return;

    }


    fallbackCopy(
      url
    );


    showShareFeedback(
      "Invitation link copied."
    );

  } catch (error) {

    if (
      error?.name ===
      "AbortError"
    ) {

      return;

    }


    fallbackCopy(
      url
    );


    showShareFeedback(
      "Invitation link copied."
    );

  }

}


function getShareUrl() {

  if (
    GRADUATION.shareUrl &&
    GRADUATION.shareUrl.trim()
  ) {

    return GRADUATION.shareUrl;

  }


  return window.location.href;

}


function fallbackCopy(
  text
) {

  const textarea =
    document.createElement(
      "textarea"
    );


  textarea.value =
    text;


  textarea.setAttribute(
    "readonly",
    ""
  );


  textarea.style.position =
    "fixed";


  textarea.style.opacity =
    "0";


  document.body.appendChild(
    textarea
  );


  textarea.select();


  document.execCommand(
    "copy"
  );


  textarea.remove();

}


function showShareFeedback(
  message
) {

  shareFeedback.textContent =
    message;


  clearTimeout(
    showShareFeedback.timer
  );


  showShareFeedback.timer =
    setTimeout(
      () => {

        shareFeedback.textContent =
          "";

      },
      3500
    );

}


/* =========================================================
   UTILITIES
========================================================= */

function escapeHTML(
  value = ""
) {

  return String(value)

    .replace(
      /&/g,
      "&amp;"
    )

    .replace(
      /</g,
      "&lt;"
    )

    .replace(
      />/g,
      "&gt;"
    )

    .replace(
      /"/g,
      "&quot;"
    )

    .replace(
      /'/g,
      "&#039;"
    );

}
