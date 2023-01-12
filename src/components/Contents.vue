<template>
    <div class="w-full h-full bg-no-repeat bg-cover bg-center bf-fixed" 
    :style="{'background': '#1A4268C2'}">
        <div class="font-sans font-bold pt-80 pb-3 text-3xl text-white">Contents</div>
            <div class="inline-flex justify-center items-center w-full">
                <hr class="my-6 w-3/5 h-1 bg-blue-700 border-0">
            </div>
        <div class="md:container md:mx-auto pt-4 pb-8 text-xl">
            <div class="grid grid-cols-3 gap-3 justify-items-center">
                <div class="card w-92 bg-base-100 shadow-xl">
                    <figure class="px-10 pt-10">
                        <img src="https://placeimg.com/400/225/arch" alt="Shoes" class="rounded-xl" />
                     </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div class="card-actions">
                            <button class="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>
                <div class="card w-92 bg-base-100 shadow-xl">
                    <figure class="px-10 pt-10">
                        <img src="https://placeimg.com/400/225/arch" alt="Shoes" class="rounded-xl" />
                     </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div class="card-actions">
                            <button class="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>
                <div class="card w-92 bg-base-100 shadow-xl">
                    <figure class="px-10 pt-10">
                        <img src="https://placeimg.com/400/225/arch" alt="Shoes" class="rounded-xl" />
                     </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div class="card-actions">
                            <button class="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mb-80 btn bg-white hover:bg-blue-700 text-black hover:text-white font-bold py-2 px-4 border border-white hover:border-white " :style="{'border-radius': '30px'}">
        <router-link :to="{ name: 'ContentPage' }">READ MORE!</router-link>
    </div>
    </div>
</template>