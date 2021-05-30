<script lang="ts">

  import { generateDots } from './dots'

  let address =
`Risk Management
Bank of Valletta p.l.c
Level 3 Centris Business Gateway,
Triq is-Salib ta' l-Imriehel, Zone 3
Central Business District CBD 3020 – Malta`

  const MAX_X = 50;
  const MAX_Y = 100;

  let name = 'Sarah Camilleri';
  let designation = 'Data Analyst';
  let mobileNumber;
  let landlineNumber = '(+356) 21312020';

  let circleA
  let circleB

  $: circleA = generateDots(name).circleA
  $: circleB = generateDots(name).circleB

  const styles = {
    global: 'font-family: Trebuchet MS, sans-serif;',
    name: 'font-size: 20px; font-weight: bold;',
    designation: 'font-size: 16px; font-weight: bold; margin-bottom: 20px;',
    info: 'font-size: 14px; padding-left: 10px;',
    address: 'margin-top: 10px;',
    logo: 'margin-top: 20px;'
  }

</script>

<main>
  <div style={styles.global}>
    <div>
      <div style={styles.name}>{name}</div>
      <div style={styles.designation}>{designation}</div>
    </div>
    <table>
      <tr>
        <td>
          <svg width={MAX_X} height={MAX_Y}>
            <circle {...circleB} />
            <circle {...circleA} />
          </svg>
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
  <div>
      <div class="form-control">
        <label for="name">Name</label>
        <input id="name" type="text" bind:value={name} >
      </div>
      <div class="form-control">
        <label for="designation">Designation</label>
        <input id="designation" type="text" bind:value={designation} >
      </div>
      <div class="form-control">
        <label for="mobile-number">Mobile number</label>
        <input id="mobile-number" type="text" bind:value={mobileNumber}>
      </div>
      <div class="form-control">
        <label for="landline-number">Landline Number</label>
        <input id="landline-number" type="text" bind:value={landlineNumber}>
      </div>
      <div class="form-control">
        <label for="address">Address</label>
        <textarea id="address" style="height: 200px;">{address}</textarea>
      </div>
      <button type="button">Save</button>
  </div>
</main>

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
