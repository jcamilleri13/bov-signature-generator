<script lang="ts">
  import { address as defaulAddress } from './address'
  import { generateDots } from './dots'
  import { tick } from 'svelte'
  import { saveAs } from 'file-saver'
  import JSZip from 'jszip'

  const PATTERN_WIDTH = 50;
  const PATTERN_HEIGHT = 100;

  let name = 'Sarah Camilleri';
  let designation = 'Data Analyst';
  let mobileNumber;
  let landlineNumber = '(+356) 21312020';
  let address = defaulAddress

  let circleA
  let circleB

  let canvasElement: HTMLCanvasElement
  let imageSource
  let signature: HTMLElement
  let svgElement

  const styles = {
    global: 'font-family: Trebuchet MS, sans-serif;',
    name: 'font-size: 20px; font-weight: bold;',
    designation: 'font-size: 16px; font-weight: bold; margin-bottom: 20px;',
    info: 'font-size: 14px; padding-left: 10px;',
    address: 'margin-top: 10px;',
    logo: 'margin-top: 20px;'
  }

  function onNameChange (e) {
    name = e.target.value

    // Reset any constrcuted PNGs.
    imageSource = undefined
  }

  $: circleA = generateDots(name, PATTERN_WIDTH, PATTERN_HEIGHT).circleA
  $: circleB = generateDots(name, PATTERN_WIDTH, PATTERN_HEIGHT).circleB

  async function savePng () {
    const promise = new Promise<void>((resolve, reject) => {
      // PNG already saved, SVG is not in the DOM.
      if (!svgElement) return

      const data = (new XMLSerializer()).serializeToString(svgElement)

      const image = new Image()
      image.onload = async () => {
        const canvasContext = canvasElement.getContext('2d')
        canvasContext.drawImage(image, 0, 0)
        const dataUrl = canvasElement.toDataURL('image/png')

        const formData = new FormData()
        formData.append('file', dataUrl)
        formData.append('upload_preset', 'bov-signature-generator')

        const response = await fetch('https://api.cloudinary.com/v1_1/bezbizija/image/upload', {
          method: 'POST',
          body: formData
        }).then(response => response.text())

        imageSource = JSON.parse(response).url
        resolve()
      }

      image.src = 'data:image/svg+xml;base64,' + window.btoa(data)
    })


    return promise
  }

  async function generateSignature () {
    await savePng()

    // Wait for Svelte to update the DOM.
    await tick()

    const signatureHtml = signature.outerHTML
    const signatureHtmlBlob = new Blob([signatureHtml], {
      type: "text/plain;charset=utf-8"
    })

    const signaturePlainText = [
      name,
      designation,
      '',
      mobileNumber,
      landlineNumber,
      '',
      address
    ].filter(text => text !== undefined).join('\n')
    const signaturePlainTextBlob = new Blob([signaturePlainText], {
      type: "text/plain;charset=utf-8"
    })

    const zip = new JSZip()
    const zipFile = await zip
      .file(`${name}.htm`, signatureHtmlBlob)
      .file(`${name}.txt`, signaturePlainTextBlob)
      .generateAsync({ type: 'blob' })

    saveAs(zipFile, `${name}.zip`)
  }
</script>

<main>
  <div>
    <div bind:this={signature} style={styles.global}>
      <div>
        <div style={styles.name}>{name}</div>
        <div style={styles.designation}>{designation}</div>
      </div>
      <table>
        <tr>
          <td>
            {#if imageSource}
              <img
                width={PATTERN_WIDTH}
                height={PATTERN_HEIGHT}
                src={imageSource}
                alt="abstract dot pattern"
              >
            {:else}
              <svg
                width={PATTERN_WIDTH}
                height={PATTERN_HEIGHT}
                bind:this={svgElement}
              >
                <circle {...circleB} />
                <circle {...circleA} />
              </svg>
            {/if}
          </td>
          <td style={styles.info}>
            {#if mobileNumber}<div>{mobileNumber}</div>{/if}
            <div>{landlineNumber}</div>
            <div style={styles.address}>
              {#each address.split(/\r?\n/) as line}
                <div>{line}</div>
              {/each}
            </div>
          </td>
        </tr>
      </table>
      <img
        src="https://gifted-mcclintock-bdf3d5.netlify.app/logo.png"
        alt="Risk Management logo"
        style={styles.logo}
      >
    </div>
  </div>
  <div>
      <div>
        <label for="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          on:input={onNameChange}
        >
      </div>
      <div>
        <label for="designation">Designation</label>
        <input id="designation" type="text" bind:value={designation} >
      </div>
      <div>
        <label for="mobile-number">Mobile number</label>
        <input id="mobile-number" type="text" bind:value={mobileNumber}>
      </div>
      <div>
        <label for="landline-number">Landline Number</label>
        <input id="landline-number" type="text" bind:value={landlineNumber}>
      </div>
      <div>
        <label for="address">Address</label>
        <textarea id="address" style="height: 200px;">{address}</textarea>
      </div>
      <button type="button" on:click={generateSignature}>Save</button>
  </div>
</main>

<canvas
  bind:this={canvasElement}
  style="display: none;"
  width={PATTERN_WIDTH}
  height={PATTERN_HEIGHT}
></canvas>

<style lang="scss">
  main {
    display: flex;
    width: 1000px;
    margin: auto;

    > * {
      flex: 1;
      padding: 2rem;
    }
  }

  button {
    margin-top: 20px;
    padding: 0.755rem 1rem;

    font-family: inherit;
    font-weight: bold;
    font-size: 1.2rem;
    text-transform: uppercase;
    text-decoration: none;

    border: none;
    color: white;
    background: #840b55;
    border-radius: 3px;

    cursor: pointer;
    transition: background 0.25s ease-in-out;
  }

  button:hover {
    background-color: hsl(323, 85%, 20%);
  }
</style>
