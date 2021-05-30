<script lang="ts">
  let address =
`Risk Management
Bank of Valletta p.l.c
Level 3 Centris Business Gateway,
Triq is-Salib ta' l-Imriehel, Zone 3
Central Business District CBD 3020 – Malta`

  let name = 'Sarah Camilleri';
  let designation = 'Data Analyst';
  let mobileNumber;
  let landlineNumber = '(+356) 21312020';

  const styles = {
    global: 'font-family: Trebuchet MS, sans-serif;',
    name: 'font-size: 20px; font-weight: bold;',
    designation: 'font-size: 16px; font-weight: bold; margin-bottom: 10px;',
    info: 'font-size: 14px;',
    address: 'margin-top: 10px;'
  }
</script>

<main>
  <div style={styles.global}>
    <div>
      <div style={styles.name}>{name}</div>
      <div style={styles.designation}>{designation}</div>
    </div>
    <table>
      <td></td>
      <td style={styles.info}>
        {#if mobileNumber}<div>{mobileNumber}</div>{/if}
        <div>{landlineNumber}</div>
        <div style={styles.address}>
          {#each address.split(/\r?\n/) as line}
            <div>{line}</div>
          {/each}
        </div>
      </td>
    </table>
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
