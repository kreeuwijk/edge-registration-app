import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, faCompass } from "@fortawesome/free-solid-svg-icons";
import useDemoControls from "components/common/DemoSettings";
import useSSR from "components/common/SSR";
import Image from "next/image";

export default function Form({ applianceId }) {
  const appliance = useRef(null);
  const [isDisabled, setDisabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applianceValue, setApplianceValue] = useState(applianceId || "");

  const { name, selectionLabel, logo } = useDemoControls();

  async function fun() {
    setDisabled(true);

    console.log("hello");
    try {
      const ndef = new NDEFReader();
      await ndef.scan();
      console.log("> Scan started");

      ndef.addEventListener("readingerror", () => {
        console.log(
          "Argh! Cannot read data from the NFC tag. Try another one?"
        );
      });

      ndef.addEventListener("reading", ({ message, serialNumber }) => {
        console.log(`> Serial Number: ${serialNumber}`);
        console.log(`> Records: (${message.records.length})`);

        const decoder = new TextDecoder();
        for (const record of message.records) {
          if (record.recordType === "text") {
            const data = decoder.decode(record.data);
            console.log(`data ${data}`);

            appliance.current.value = data;
            // const article =/^[aeio]/i.test(json.title) ? "an" : "a";
            // console.log(`${json.name} is ${article} ${json.title}`);
          }
        }
      });
    } catch (error) {
      console.log("Argh! " + error);
    }
  }

  const isSSR = useSSR();

  // useEffect( () => {
  //   async function nfc() {
  //     try {
  //       const ndef = new NDEFReader();
  //       await ndef.scan();
  //       console.log("> Scan started");

  //       ndef.addEventListener("readingerror", () => {
  //         console.log("Argh! Cannot read data from the NFC tag. Try another one?");
  //       });

  //       ndef.addEventListener("reading", ({ message, serialNumber }) => {
  //         console.log(`> Serial Number: ${serialNumber}`);
  //         console.log(`> Records: (${message.records.length})`);
  //       });
  //     } catch (error) {
  //       console.log("Argh! " + error);
  //     }

  //   }
  //   nfc();

  // });
  return (
    <div className={styles.container}>
      <div className={styles.logoWrap}>
        {isSSR ? null : (
          <img className={styles.logo} src={logo} alt="demo logo" />
        )}
      </div>
      <h1 className={styles.title}>
      <span className="accent">{name}</span> appliance registration!
      </h1>
      <p className={styles.description}>
        Register the Edge appliance with a datacenter
        {/* <code className={styles.code}>pages/no-js-from.js</code> */}
      </p>

      <form
        action="/api/form"
        method="post"
        onSubmit={() => setIsSubmitting(true)}
      >
        <label htmlFor="appliance">Appliance ID</label>
        <div style={{ display: "flex" }}>
          <input
            value={applianceValue}
            onChange={(ev) => setApplianceValue(ev.target.value)}
            style={{ flexGrow: 1 }}
            type="text"
            ref={appliance}
            id="appliance"
            name="appliance"
            required
          />
          <button
            className={styles.scan}
            disabled={isDisabled}
            onClick={fun}
          >
            <FontAwesomeIcon icon={faCompass} />
          </button>
        </div>
        <label htmlFor="crmProject">{selectionLabel}</label>
        <select id="store" name="store" required>
          <option value="edge-dwx-a;62a74addd13e4a23b1ece588">
            Datacenter A, NL
          </option>
          <option value="edge-dwx-b;62a74addd13e4a23b1ece588">
            Datacenter B, NL
          </option>
          //<option value="edge-dwx-a;62a8918bd13e4b3925f4e23a,62a74addd13e4a23b1ece588">
          //  Datacenter A, NL
          //</option>
          //<option value="edge-dwx-b;62a8918bd13e4b3925f4e23a,62a74addd13e4a23b1ece588">
          //  Datacenter B, NL
          //</option>
        </select>

        <button type="submit" disabled={isSubmitting}>
          Submit
          {isSubmitting ? <FontAwesomeIcon icon={faCircleNotch} spin /> : null}
        </button>
      </form>
    </div>
  );
}

export function getServerSideProps({ query }) {
  return {
    props: {
      applianceId: query["appliance-id"] || "",
    },
  };
}
