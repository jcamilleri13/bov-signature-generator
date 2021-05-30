<script lang="ts">
  let address =
`Risk Management
Bank of Valletta p.l.c
Level 3 Centris Business Gateway,
Triq is-Salib ta' l-Imriehel, Zone 3
Central Business District CBD 3020 – Malta`

  const MAX_X = 100;
  const MAX_Y = 150;

  let name = 'Sarah Camilleri';
  let designation = 'Data Analyst';
  let mobileNumber;
  let landlineNumber = '(+356) 21312020';

  let circleA
  let circleB

  $: circleA = {
    cx: Math.abs(hash(name.split(' ')[0])) / 2147483647 * MAX_X,
    cy: Math.abs(hash(name.split(' ')[0].split('').reverse().toString())) / 2147483647 * MAX_Y,
    r: name.split(' ')[0].length * 2
  }

  $: circleB = {
    cx: Math.abs(hash(name.split(' ')[1])) / 2147483647 * MAX_X,
    cy: Math.abs(hash(name.split(' ')[1].split('').reverse().toString())) / 2147483647 * MAX_Y,
    r: name.split(' ')[1].length * 3
  }

  const styles = {
    global: 'font-family: Trebuchet MS, sans-serif;',
    name: 'font-size: 20px; font-weight: bold;',
    designation: 'font-size: 16px; font-weight: bold; margin-bottom: 10px;',
    info: 'font-size: 14px;',
    address: 'margin-top: 10px;',
    logo: 'margin-top: 10px;'
  }

  function hash (string) {
      if (!string) return 0

	    let hash = 0

      if (string.length === 0) return hash

      for (let i = 0; i < string.length; i++) {
	        const char = string.charCodeAt(i)
	        hash = ((hash << 5) - hash) + char
	        hash = hash & hash // Convert to 32bit integer
	    }

	    return hash
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
            <circle {...circleA} fill="blue" />
            <circle cx={circleB.cx} cy={circleB.cy} r="5" fill="blue" />
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
    <img src="/logo.png" alt="Risk Management logo" style={styles.logo}>
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
        <textarea id="address">{address}</textarea>
      </div>

      <div>{circleA.cx}</div>
      <div>{circleA.cy}</div>
  </div>
</main>

<style lang="scss">
  main {
    display: flex;

    > * {
      flex: 1;
      padding: 1rem;
    }
  }

  // .form-control {}

</style>
