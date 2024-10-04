<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal-overlay__modal-content" @click.stop>
      <div class="modal-overlay__close-btn" @click="closeModal">
        <el-icon class="custom-icon">X</el-icon>
      </div>
      <img :src="product.image" alt="product image" class="modal-overlay__modal-image" />
      <h2>{{ product.title }}</h2>
      <p>Price: ${{ product.price }}</p>
      <p>Category: {{ product.category }}</p>
      <p>Rating: {{ product.rating.rate }} ({{ product.rating.count }} reviews)</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: Object
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  &__modal-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 700px;
    position: absolute;
  }
  &__close-btn {
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    position: absolute;
    top: -3px;
    right: 0;
    .custom-icon {
      color: #03a9f4;
    }
  }
  &__modal-image {
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
    display: flex;
    margin: auto;
    min-height: 14rem;
    width: auto;
  }
}
</style>
