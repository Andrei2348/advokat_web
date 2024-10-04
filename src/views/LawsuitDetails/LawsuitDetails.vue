<template>
  <div :class="['lawsuit__container', { collapsed: uxuiStore.asideCollapsed }]">
    <div class="lawsuit__buttons-nav" v-if="mainStore.isMobile">
      <button
        class="lawsuit__button lawsuit__button-left"
        @click="toggleView(false)"
      >
        <SvgIcon icon="chevron-down" />
        К списку дел
      </button>
      <button class="lawsuit__button" @click="toggleView(true)">
        В планирование
        <SvgIcon icon="chevron-down" />
      </button>
    </div>
    <div class="lawsuit__details-wrapper">
      <div class="lawsuit__details-header">
        <div
          class="lawsuit__details-data-inner lawsuit__details-data-inner-info"
        >
          <div class="lawsuit__details-data lawsuit__details-client">
            <span class="lawsuit__details-label">Клиент</span>
            <p class="lawsuit__details-name lawsuit__details-bold">
              {{ lawsuitDetails?.customer.name }}
            </p>
          </div>
          <SvgIcon icon="clientIcon" class="lawsuit__details-decor" />
          <div class="lawsuit__details-data lawsuit__details-opponent">
            <span class="lawsuit__details-label">Оппонент</span>
            <p class="lawsuit__details-name">{{ lawsuitDetails?.opponent }}</p>
          </div>
        </div>
        <div
          class="lawsuit__details-data-inner lawsuit__details-data-inner-links"
        >
          <div class="lawsuit__details-data lawsuit__details-rating">
            <span class="lawsuit__details-label lawsuit__details-label-nosmart"
              >Рейтинг</span
            >
            <StarRating
              :rating="lawsuitDetails?.rating"
              objectKey="rating"
              class="lawsuit__details-rating"
              @dataChanged="dataChanged"
            />
          </div>
          <div class="lawsuit__details-data lawsuit__details-contacts">
            <span class="lawsuit__details-label">Связь с клиентом</span>
            <div class="lawsuit__details-contacts-wrapper">
              <SocialContacts
                :phoneNumber="lawsuitDetails?.customer.phone"
                :emailAddress="lawsuitDetails?.customer.email"
                :telegramUsername="lawsuitDetails?.customer.telegram"
                :whatsAppNumber="lawsuitDetails?.customer.whatsApp"
              />
            </div>
          </div>
          <div class="lawsuit__details-data lawsuit__details-actions">
            <span class="lawsuit__details-label lawsuit__details-label-nosmart"
              >Действия</span
            >
            <div class="lawsuit__details-actions-wrapper">
              <button
                class="lawsuit__button-icon"
                @click="
                  lawsuitDetails ? editDetailsHandler(lawsuitDetails) : null
                "
              >
                <SvgIcon icon="edit" />
                В планирование
              </button>
              <button class="lawsuit__button-icon">
                <SvgIcon icon="paper" />
                Заметки
              </button>
              <button @click="getFormationAct" class="lawsuit__button-icon">
                <SvgIcon icon="file" />
                Акт
              </button>
            </div>
          </div>
        </div>
        <!-- В дальнейшем будет ссылка -->
        <div class="lawsuit__details-profile-link">
          Перейти в профиль
          <SvgIcon icon="chevron-right" />
        </div>
      </div>

      <div
        class="lawsuit__details-section"
        v-if="!mainStore.isMobile || !isPlanningView"
      >
        <div class="lawsuit__details-section-inner">
          <span class="lawsuit__details-label">Категория дела</span>
          <div class="lawsuit__details-category-content">
            <div
              class="lawsuit__details-circle"
              :style="{ background: lawsuitDetails?.lawsuitCategory.color }"
            ></div>
            <p class="lawsuit__details-content">
              {{ lawsuitDetails?.lawsuitCategory.name }}
            </p>
          </div>
          <span class="lawsuit__details-label">Фабула дела</span>
          <p class="lawsuit__details-review-text">{{ lawsuitDetails?.plot }}</p>
        </div>
        <div class="lawsuit__details-section-inner">
          <div class="lawsuit__details-section-contract">
            <DocumentInfo
              icon="fileContract"
              class="lawsuit__details-contract--info"
              v-if="lawsuitDetails?.contractNumber"
              title="Договор"
              :number="lawsuitDetails?.contractNumber"
              :signingDate="lawsuitDetails?.contractSigningDate"
              :validity="lawsuitDetails?.contractValidity"
              :endMonths="lawsuitDetails?.contractEndMonths"
              :endDays="lawsuitDetails?.contractEndDays"
            />

            <DocumentInfo
              icon="fileAttachment"
              class="lawsuit__details-contract--info"
              v-if="lawsuitDetails?.powerOfAttorney"
              title="Доверенность"
              :number="lawsuitDetails?.powerOfAttorney"
              :signingDate="lawsuitDetails?.powerOfAttorneySigningDate"
              :validity="lawsuitDetails?.powerOfAttorneyValidity"
              :endMonths="lawsuitDetails?.powerOfAttorneyEndMonths"
              :endDays="lawsuitDetails?.powerOfAttorneyEndDays"
            />
          </div>
          <div class="lawsuit__details-section-review">
            <span class="lawsuit__details-label">Орган рассмотрения</span>
            <p
              class="lawsuit__details-review-text lawsuit__details-review-court"
            >
              {{
                lawsuitDetails?.authorities[
                  lawsuitDetails?.authorities.length - 1
                ]?.authority
              }}
            </p>
          </div>
          <div class="lawsuit__details-review-link-wrapper">
            <button
              class="lawsuit__details-review-link"
              @click="reviewBodiesHandler"
            >
              Все органы рассмотрения
              <span
                v-if="lawsuitDetails?.authoritiesCount"
                class="lawsuit__details-review-link-span"
                >({{ lawsuitDetails?.authoritiesCount }})</span
              >
              <SvgIcon icon="chevron-right" />
            </button>
          </div>
          <div class="lawsuit__details-review-wrapper">
            <div class="lawsuit__details-review-wrap">
              <span class="lawsuit__details-label">Дело</span>
              <div class="lawsuit__details-review-text-wrapper">
                <template
                  v-if="lawsuitDetails?.authorities[0]?.lawsuitNumberLink"
                >
                  <a
                    class="lawsuit__details-review-link-lawsuit"
                    :href="lawsuitDetails.authorities[0].lawsuitNumberLink"
                    target="_blank"
                  >
                    {{ lawsuitDetails.authorities[0].lawsuitNumber }}
                  </a>
                </template>
                <template v-else>
                  <p class="lawsuit__details-review-text">
                    {{ lawsuitDetails?.authorities[0]?.lawsuitNumber }}
                  </p>
                </template>
              </div>
            </div>
            <div class="lawsuit__details-review-wrap">
              <span class="lawsuit__details-label">Судья/проц.лицо</span>
              <p class="lawsuit__details-review-text">
                {{ lawsuitDetails?.authorities[0]?.judge }}
              </p>
            </div>
            <div class="lawsuit__details-review-wrap">
              <span class="lawsuit__details-label">Зал/Кабинет №</span>
              <p class="lawsuit__details-review-text">
                {{ lawsuitDetails?.authorities[0]?.cabinet }}
              </p>
            </div>
          </div>
          <div class="lawsuit__details-note">
            <span
              class="lawsuit__details-label"
              v-if="lawsuitDetails?.authorities[0]?.comment"
              >Примечание</span
            >
            <p class="lawsuit__details-review-text">
              {{ lawsuitDetails?.authorities[0]?.comment }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <PlanningLawsuits v-if="!mainStore.isMobile || isPlanningView" />
  </div>
</template>

<script lang="ts" src="./LawsuitDetails.ts"></script>
<style lang="scss" scoped src="./LawsuitDetails.scss"></style>
