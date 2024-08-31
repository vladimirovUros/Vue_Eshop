<template>
    <span>
        <label v-if="label" class="form-label">{{ label }}</label>
            <label  v-for="item,index of items" :key="index" :for="item">
                <input v-model="inputValue" type="radio" :value="index" :id="item">
                {{ item }}
            </label>
        <div v-if="showHint" class="form-text">{{ hint }}</div>
            <div v-if="error" class="alert p-1 mt-2 alert-danger" role="alert">
                {{ error }}
        </div>
    </span>
</template>
<script>
export default {
    name: "RadioButtonsComponent",
    data() {
        return {
            inputValue: this.value,
        }
    },
    props: {
        error: {
            type: String
        },
        value: {
            type: [String, Number]
        },
        label: {
            type: String,
            default: ""
        },
        items: {
            type: Object,
            required: true
        },
        hint: {
            type: String,
            default: ""
        },
        id: {
            type: String
        },
    },
    mounted() {
        this.inputValue = this.value
    },
    computed: {
        style: function() {
            return this.error ? "border: 1px solid red" : ""
        },
        showHint: function() {
            return !this.error && this.hint;
        }
    },
    watch: {
        inputValue: function () {
            this.$emit("input", this.inputValue);
        },
        value: function (newValue) {
            this.inputValue = newValue;
        },
    },
}
</script>