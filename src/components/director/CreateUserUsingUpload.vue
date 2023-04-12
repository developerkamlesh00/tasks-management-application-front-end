<template>
 <div class="container">
    <h1>CSV to JSON Converter</h1>
    <label for="formFileSm" class="form-label">Small file input example</label>
    <input class="form-control form-control-sm" id="formFileSm" type="file"  @change="onFileSelected"/>
    <!-- <div class="input">
      <input type="file" @change="onFileSelected" />
    </div> -->
    <div class="output">
      <button @click="convertToJson">Convert to JSON</button>
      <pre>{{ jsonData }}</pre>
    </div>
  </div>
</template>
<script>
import Papa from "papaparse";
import axios from "axios";

export default {
  data() {
    return {
      csvData: '',
      jsonData: '',
    };
  },
  methods: {
    onFileSelected(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        this.csvData = e.target.result.replace(/\r/g, "");
      };

      reader.readAsText(file);
    },
    async convertToJson() {
      const options = {
        header: true,
        delimiter: ",",
        newline: "\n",
      };

      const parsedData = Papa.parse(this.csvData, options).data;
      parsedData.pop(); // Remove the last record

      const updatedData = parsedData.map(dataRow => {
        const updatedRow = { ...dataRow }; // Create a copy of the row
        if(updatedRow.role_id === 'worker'){
          updatedRow.role_id = 4;
        } else if(updatedRow.role_id === 'manager') {
          updatedRow.role_id = 3;
        }
        updatedRow.organization_id = this.$store.getters.organization; // Add the extra field to the copy
        return updatedRow;
      });

      const jsonData = JSON.stringify(updatedData);
      this.jsonData = jsonData;

      console.log(updatedData)
      console.log(jsonData);

      await axios.post('http://localhost:8000/api/director/bulkregister',updatedData)
      .then(function (response) {
            const data = JSON.stringify(response)
            console.log(data);

            return "Successfully Created";
          
          }).catch(err =>{
            console.log(err);
          });
    },
  },
};
</script>



<style>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
}

h1 {
  text-align: center;
  font-size: 36px;
  margin-bottom: 20px;
}

.input {
  margin-bottom: 20px;
}

.output {
  text-align: center;
}

button {
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  background-color: #007bff;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
}

pre {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  white-space: pre-wrap;
}

</style>