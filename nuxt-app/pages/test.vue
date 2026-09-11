<template>
    <div class="w-100 m-10">
        <v-card class="mx-auto" prepend-icon="$vuetify" subtitle="The #1 Vue UI Library" width="400">
            <template v-slot:title>
                <span class="font-weight-black">Welcome to Vuetify</span>
            </template>

            <v-card-text class="bg-surface-light pt-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore
                voluptatibus!
                Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde
                voluptatem!
            </v-card-text>
        </v-card>
    </div>

    <div class="w-100 m-10">
        <v-card class="mx-auto" max-width="344">
            <v-card-text>
                <div>Word of the Day</div>

                <div class="text-headline-large font-weight-black mb-4">el·ee·mos·y·nar·y</div>

                <div class="mb-4">adjective</div>

                <div class="text-medium-emphasis">
                    relating to or dependent on charity; charitable; charitable donations. Pertaining to alms.<br>
                    "an eleemosynary educational institution."
                </div>
            </v-card-text>

            <v-card-actions>
                <v-btn color="teal-accent-4" text="Learn More" variant="text" @click="reveal = true"></v-btn>
            </v-card-actions>

            <v-expand-transition>
                <v-card v-if="reveal" class="position-absolute w-100" height="100%" style="bottom: 0;">
                    <v-card-text class="pb-0">
                        <p class="text-headline-large">Origin</p>

                        <p class="text-medium-emphasis">
                            late 16th century (as a noun denoting a place where alms were distributed): from medieval
                            Latin
                            eleemosynarius, from late Latin eleemosyna ‘alms’, from Greek eleēmosunē ‘compassion’
                        </p>
                    </v-card-text>

                    <v-card-actions class="pt-0">
                        <v-btn color="teal-accent-4" text="Close" variant="text" @click="reveal = false"></v-btn>
                    </v-card-actions>
                </v-card>
            </v-expand-transition>
        </v-card>
    </div>

    <div class="w-100 m-10">

        <v-card class="mx-auto" color="surface-variant"
            image="https://cdn.vuetifyjs.com/docs/images/cards/dark-beach.jpg" max-width="340"
            subtitle="Take a walk down the beach" title="Evening sunset">
            <template v-slot:actions>
                <v-btn append-icon="mdi-chevron-right" color="red-lighten-2" text="Book Activity" variant="outlined"
                    block></v-btn>
            </template>
        </v-card>
    </div>

    <div class="w-100 m-10">
        <v-dialog max-width="500">
            <template v-slot:activator="{ props: activatorProps }">
                <v-btn v-bind="activatorProps" color="surface-variant" text="Open Dialog" variant="flat"></v-btn>
            </template>

            <template v-slot:default="{ isActive }">
                <v-card title="Dialog">
                    <v-card-text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn text="Close Dialog" @click="isActive.value = false"></v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
    </div>

    <div class="w-100 m-10">
        <v-radio-group inline v-model="radios">
            <template v-slot:label>
                <div>Choose your browser</div>
            </template>
            <v-radio label="Chrome" value="1"></v-radio>
            <v-radio label="Firefox" value="2"></v-radio>
            <v-radio label="Safari" value="3"></v-radio>
            <v-radio label="Edge" value="4"></v-radio>
        </v-radio-group>
    </div>

    <div class="w-100 m-10">
        <v-sheet class="mx-auto bg-cyan-darken-4 pa-8" width="400" rounded>
            <v-form>
                <v-text-field label="Email" type="email"></v-text-field>

                <v-text-field label="Password" type="password"></v-text-field>

                <v-btn color="teal-accent-4" type="submit" block>Submit</v-btn>
            </v-form>
        </v-sheet>
    </div>

    <div class="w-100 m-10">
        <v-card class="mx-auto" max-width="368">
            <v-card-item title="Florida">
                <template v-slot:subtitle>
                    <v-icon class="me-1 pb-1" color="error" icon="mdi-alert" size="18"></v-icon>

                    Extreme Weather Alert
                </template>
            </v-card-item>

            <v-card-text class="py-0">
                <v-row class="align-center" density="compact">
                    <v-col class="text-display-large font-weight-light" cols="6">
                        64&deg;F
                    </v-col>

                    <v-col class="text-right" cols="6">
                        <v-icon color="error" icon="mdi-weather-hurricane" size="88"></v-icon>
                    </v-col>
                </v-row>
            </v-card-text>

            <div class="d-flex py-3 justify-space-between">
                <v-list-item density="compact" prepend-icon="mdi-weather-windy">
                    <v-list-item-subtitle>123 km/h</v-list-item-subtitle>
                </v-list-item>

                <v-list-item density="compact" prepend-icon="mdi-weather-pouring">
                    <v-list-item-subtitle>48%</v-list-item-subtitle>
                </v-list-item>
            </div>

            <v-expand-transition>
                <div v-if="expand">
                    <div class="py-2">
                        <v-slider v-model="time" :max="6" :step="1" :ticks="labels" class="mx-4" color="primary"
                            density="compact" show-ticks="always" thumb-size="10" hide-details></v-slider>
                    </div>

                    <v-list class="bg-transparent">
                        <v-list-item v-for="item in forecast" :key="item.day" :append-icon="item.icon"
                            :subtitle="item.temp" :title="item.day">
                        </v-list-item>
                    </v-list>
                </div>
            </v-expand-transition>

            <v-divider></v-divider>

            <v-card-actions>
                <v-btn :text="!expand ? 'Full Report' : 'Hide Report'" @click="expand = !expand"></v-btn>
            </v-card-actions>
        </v-card>

    </div>


</template>

<script setup>
import { ref } from 'vue'

const reveal = ref(false)

const labels = { 0: 'SU', 1: 'MO', 2: 'TU', 3: 'WED', 4: 'TH', 5: 'FR', 6: 'SA' }
const forecast = [
    { day: 'Tuesday', icon: 'mdi-white-balance-sunny', temp: '24\u00B0/12\u00B0' },
    { day: 'Wednesday', icon: 'mdi-white-balance-sunny', temp: '22\u00B0/14\u00B0' },
    { day: 'Thursday', icon: 'mdi-cloud', temp: '25\u00B0/15\u00B0' },
]

const expand = ref(false)
const time = ref(0)
</script>

<style scoped></style>
