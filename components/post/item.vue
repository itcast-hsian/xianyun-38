<template>
    <div class="div">
        <div v-for="(item, index) in list" :key="index">
            {{item.name}}

            <item :list="item.children"/>
        </div>
    </div>
</template>

<script>
export default {
    name: "item",
    props: ["list"]
}
</script>

<style scoped>
    .div div{
        padding-left:25px;
    }
</style>