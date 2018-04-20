<template>
  <div class="phone-container">
    <vue-select class="cn-list" v-model="selectedCountry" :options="list" label="dial_code">
      <template slot="option" slot-scope="option">
        {{ option.dial_code }}
      </template>
    </vue-select>
    <input ref="phoneField" type="tel" @input="updateValue" :class="{'error': (value.phone=='' || value=='')}" placeholder="Phone Number">
  </div>
</template>

<style scoped> 
  .phone-container{
    display: flex;
  }
  .cn-list{
    width: 150px;
    margin-right: 10px;
  }
  input{
    outline: none;
  }
</style>

<script>
  import 'cleave.js';
  import VueSelect from 'vue-select';
  require('cleave.js/dist/addons/cleave-phone.us');
  export default{
    components: {VueSelect},
    props: ['value'],
    data() {
      return {
        selectedCountry: {
          code:"US",
          dial_code:"+1",
          name:"United States"
        },
        list: require('./country-code.json'),
        options: {
          phone: true,
          phoneRegionCode: 'US'
        }
      }
    },
    mounted() {
     this.cleave = new Cleave(this.$refs.phoneField, this.options)
     this.cleave.setRawValue(this.value.phone);
     this.selectedCountry = this.value.country ? this.value.country : this.selectedCountry;
    },
    destroyed() {
      this.cleave.destroy()
    },
    watch: {
      value: 'updateInput',
      selectedCountry:{
        deep: true,
        handler(){
          this.options.phoneRegionCode = this.selectedCountry.code;
          // require('cleave.js/dist/addons/cleave-phone.'+(this.selectedCountry.code).toLowerCase());
          this.cleave = new Cleave(this.$refs.phoneField, this.options);
          this.updateValue();
        }
      }
    },
    methods: {
      updateValue() {
        var val = this.cleave.getRawValue();
        this.$emit('input', {country: this.selectedCountry, phone: val, stripped: parseInt((this.selectedCountry.dial_code + val).match(/\d/g).join(""))});
      },
      updateInput() {
        this.cleave.setRawValue(this.value.phone)
      }
    }
  }
</script>