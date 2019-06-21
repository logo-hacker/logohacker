<template>
    <div>
        <div id="capture" style="padding: 10px; background: #f5da55">
            <h4 style="color: #000; ">Hello world!</h4>
            <div>
                Logo
            </div>
        </div>

        <canvas id="canv" width="200" height="200"></canvas> -->

        <!-- <a @click="screenshot()">
            save
        </a> -->

        <div id="result"></div>

        <form method="post" action="" @submit.prevent="screenshot();">
            <input id="inp_img" name="image_url" type="hidden" value="" v-model.trim="image_base64">
            <input id="bt_upload" type="submit" value="Download">
        </form>
    </div>
</template>

<script>
    export default {

    }
</script>

<style>

</style>