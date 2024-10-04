<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import axiosInstance from '../helpers/axiosInstance'
import showMessage from '../composables/showMessage'
import { Product } from '../types/product'
import ProductModal from './ProductModal.vue'
import ProductCard from './ProductCard.vue'

const data = ref([])
const loading = ref(false)
const error = ref(null)

const products = ref<Product[]>([])
const draggedItemIndex = ref<number | null>(null)
const selectedProduct = ref<Product | null>(null)
const displayedCount = ref(8) // Show 8 products initially
const itemsPerPage = 8 // Number of products to show each time

const fetchProducts = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await axiosInstance.get<Product[]>('/products') // Replace with your API endpoint
    products.value = response.data
  } catch (err) {
    error.value = 'Error fetching data: ' + (err.response?.data?.message || err.message)
  } finally {
    loading.value = false
  }
}

const onDragStart = (index: number) => {
  draggedItemIndex.value = index
}

const onDrop = (index: number) => {
  if (draggedItemIndex.value !== null) {
    const draggedItem = products.value.splice(draggedItemIndex.value, 1)[0]
    products.value.splice(index, 0, draggedItem)
    sessionStorage.setItem('products', JSON.stringify(products.value))
  }
}

const showDetails = (product: Product) => {
  selectedProduct.value = product
}

const showMore = () => {
  displayedCount.value += itemsPerPage
}

const displayedProducts = computed(() => {
  return products.value.slice(0, displayedCount.value)
})

onMounted(() => {
  const savedProducts = sessionStorage.getItem('products')
  if (savedProducts) {
    showMessage('Catch data from session Storage')
    products.value = JSON.parse(savedProducts)
  } else {
    fetchProducts()
  }
})

const showMoreButton = computed(() => {
  return displayedCount.value < products.value.length
})
</script>

<template>
  <div class="card-container">
    <el-container>
      <el-card>
        <template #header>
          <div class="card-header">
            <span>All The Products</span>
          </div>
        </template>

        <div class="products">
          <ProductCard
            v-for="(product, index) in displayedProducts"
            :key="product.id"
            :image="product.image"
            :title="product.title"
            :price="product.price"
            :index="index"
            @dragstart="onDragStart"
            @drop="onDrop"
            @showDetails="() => showDetails(product)"
          />
          <ProductModal
            v-if="selectedProduct"
            :product="selectedProduct"
            @close="selectedProduct = null"
          />
        </div>
      </el-card>
    </el-container>
  </div>

  <el-row>
    <el-col class="show-more" :span="24">
      <el-button
        type="success"
        v-if="showMoreButton"
        @click="showMore"
        plain
        class="show-more__btn"
      >
        Show More
      </el-button>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.products {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.show-more__btn {
  margin: auto;
  display: flex;
  margin-top: 1rem;
}
</style>
