<template>
  <v-app :full-height="false">
    <v-main>

      <carousel :autoplay="0" breakpointsMode="carousel" :breakpoints="breakpoints" :mouseWheel="true" :gap="5"
        class="planselector" ref="planSelector">

        <slide v-for="(plan, idx) in filteredPlans" :key="idx" style="align-self: start">
          <template #default="{ currentIndex }">
            <v-card class="prevent-select mb-10 w-100 purple text-center" @click="goToSlide(currentIndex)">

              <v-card-title class="name pt-5 pb-0">{{ plan.name }}</v-card-title>

              <v-card-title class="pt-0 price text-h3 font-weight-black">
                ${{ plan.monthly }}<small class="text-h5">/mth</small>
                <v-divider class="mt-4" thickness="5" />
              </v-card-title>

              <v-card-text class="speed pt-3">
                <div class="time" v-if="typicalSpeedType == 'business'">Typical Evening Speed (8am-5pm)</div>
                <div class="time" v-else>Typical Evening Speed (7pm-11pm)</div>

                <v-tabs align-tabs="center" hide-slider class="mt-1">
                  <v-tab variant="text">
                    <div>
                      <h3 class="text-h6 speedVal">{{ plan.typicalDownload }}Mbps</h3>
                      <div class="text-caption">download</div>
                    </div>
                  </v-tab>
                  <v-divider vertical thickness="3"></v-divider>
                  <v-tab variant="text">
                    <div>
                      <h3 class="text-h6 speedVal">{{ plan.typicalUpload }}Mbps</h3>
                      <div class="text-caption">upload</div>
                    </div>
                  </v-tab>
                </v-tabs>
              </v-card-text>

              <v-card-text class="selector text-center pt-0 pb-1" style="height: 20px">
                <v-btn class="mb-n6" rounded color="success" v-bind="plan.link">
                  {{ plan.linkText }} <v-icon class="ml-1">mdi-arrow-right-circle</v-icon>
                </v-btn>
              </v-card-text>
              <v-card-text></v-card-text>

              <v-list bg-color="transparent" dense ref="guideList">

                <v-list-item class="text-left prevent-select" prepend-icon="mdi-information" dense :style="refPlanDescriptionStyle">
                  <div ref="planDescription" >
                    <v-list-item-title class="text-body-2" style="white-space: normal;">What is {{ plan.name }}?</v-list-item-title>
                    <div class="text-caption" v-html="plan.description"></div>
                  </div>
                </v-list-item>

                <v-list-item class="text-left prevent-select" prepend-icon="mdi-wifi" dense :style="refPlanTechnologyStyle">
                  <div ref="planTechnology">
                    <v-list-item-title class="text-body-2" style="white-space: normal;">Technology</v-list-item-title>
                    <div class="text-caption">The {{ plan.name }} plan is available on the nbn Co network using where your address is serviced by {{ plan.techs }} technologies.</div>
                  </div>
                </v-list-item>
              </v-list>

            </v-card>
          </template>
        </slide>
        <template #addons>
          <Pagination paginateByItemsToShow />
        </template>

      </carousel>
    </v-main>
  </v-app>
</template>

<style>
.planselector .v-expansion-panel-text__wrapper {
  padding-left: 0.25rem !important;
  padding-right: 0.25rem !important
}

.planselector .v-list-item__spacer {
  width: 10px !important;
}

.planselector .v-list-item__prepend,
.planselector .v-list-item__content {
  align-self: start !important;
}

.prevent-select {
  -webkit-user-select: none;
  /* Safari */
  -ms-user-select: none;
  /* IE 10 and IE 11 */
  user-select: none;
  /* Standard syntax */
}

.carousel {
  --vc-pgn-height: 10px;
  --vc-pgn-width: 20px;
  --vc-pgn-border-radius: 3px;
}
</style>

<style scoped lang="scss">

.planselector {

  .price {
    line-height: 1;
  }

  .name {
    font-size: 1.6rem;
  }


  .speed {
    .time {
      font-size: 0.8rem;
    }
  }

  .purple {
    border: 1px solid rgba(38, 9, 107, 1);

    .name,
    .speed,
    .speedVal,
    .price,
    .selector {
      background-color: rgba(38, 9, 107, 1);
      color: white;
    }
  }

  .green {
    border: 1px solid rgba(0, 168, 150, 1);

    .name,
    .speed,
    .price,
    .selector {
      background-color: rgba(0, 168, 150, 1);
      color: white;
    }
  }
}
</style>

<script setup lang="ts">
  import 'vue3-carousel/carousel.css'
  import { Carousel, Slide, Pagination } from 'vue3-carousel';
  import { computed, useTemplateRef } from 'vue';
  import { AppProps, Plan } from './types';
  import { useElementScrollHeight } from './composables/useElementScrollHeight';


  const props = defineProps<AppProps>();
  const planSelector = useTemplateRef('planSelector');

  const filteredPlans = computed(() => props.plans.map((plan: Plan) => {

    const allFixedLineTech = plan.techFTTP && plan.techHFC && plan.techFTTC && plan.techFTTN && plan.techFTTB;


    return {
      ...plan,
      allFixedLineTech,

      techs: [
        plan.techFTTP ? 'FTTP' : '',
        plan.techHFC ? 'HFC' : '',
        plan.techFTTC ? 'FTTC' : '',
        plan.techFTTN ? 'FTTC' : '',
        plan.techFTTB ? 'FTTC' : '',
        plan.techFW ? 'FWA' : '',
        plan.techSat ? 'SAT' : ''
      ].filter(Boolean).join(', '),
    }
  }));

  const goToSlide =  (index: number) => {
    if (planSelector.value) {
      //planSelector.value.goToSlide(index);
    }
  };


  const breakpoints = computed(() => {

    return props.breakpoints?.reduce((acc, bp) => ({
      ...acc,
      [bp.break]: {
        itemsToShow: bp.itemsToShow,
        itemsToScroll: bp.itemsToScroll,
      }
    }), {});

    /*return {
      0: {
        itemsToShow: 1.2,
        itemsToScroll: 1,
      },
      500: {
        itemsToShow: 1.6,
      },
      600: {
        itemsToShow: 2.2,
        itemsToScroll: 2,
      },
      960: {
        itemsToShow: 5.2,
        itemsToScroll: 3,
      },
      1280: {
        itemsToShow: 5.2,
        itemsToScroll: 3,
      },
      1920: {
        itemsToShow: 4.2,
        itemsToScroll: 4,
      },
      2560: {
        itemsToShow: 4.2,
        itemsToScroll: 4,
      },
    };*/
  });

  const refPlanDescriptions = useTemplateRef<HTMLDivElement[]>('planDescription');
  const refPlanDescriptionScrollHeights = computed(() => {
    return refPlanDescriptions.value
      ? refPlanDescriptions.value.map((el: any) => useElementScrollHeight(el).scrollHeight.value)
      : [ 0 ];
  });
  const refPlanDescriptionStyle = computed(() => ({
    height: 'auto',
    minHeight: Math.ceil(Math.max(...refPlanDescriptionScrollHeights.value)+15) + 'px',
  }));

  const refPlanTechnologies = useTemplateRef<HTMLDivElement[]>('planTechnology');
  const refPlanTechnologyScrollHeights = computed(() => {
    return refPlanTechnologies.value
      ? refPlanTechnologies.value.map((el: any) => useElementScrollHeight(el).scrollHeight.value)
      : [ 0 ];
  });
  const refPlanTechnologyStyle = computed(() => ({
    height: 'auto',
    minHeight: Math.ceil(Math.max(...refPlanTechnologyScrollHeights.value)+10) + 'px',
  }));

</script>
