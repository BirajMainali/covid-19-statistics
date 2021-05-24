<template>
  <div class="card p-0 mb-3">
    <div
        class="card-header"
        style="background-color: #f2f2f2;border-radius:15px 15px 0 0;"
    >
      <strong class="card-title">Active</strong>
    </div>
    <div class="card-body px-0 pt-0">
      <table class="table table-border table-hover mb-0">
        <tbody>
        <tr>
          <td>New</td>
          <td class="text-end">{{ CountryInfo.New }}</td>
        </tr>
        <tr>
          <td>Active</td>
          <td class="text-end">{{ CountryInfo.Active }}</td>
        </tr>
        <tr>
          <td>Per Million</td>
          <td class="text-end">{{ CountryInfo.CasesPM }}</td>
        </tr>
        <tr>
          <td>Total</td>
          <td class="text-end">{{ CountryInfo.TotalCases }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "SummaryTable",
  props: {
    title: String,
    countries: Object
  }
};
</script>

<style></style>
