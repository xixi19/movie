import Vue from 'vue'
import Router from 'vue-router'
import Cinema from '../components/Cinema'
import Mine from '../components/Mine'
import Movie from '../components/Movie'
import Undarway from '../components/movie/Undarway'
import Upcoming from '../components/movie/Upcoming'
import DetailPage from '../components/movie/DetailPage'
import City from '../components/City'
import Discuss from '../components/movie/Discuss'
import Updiss from '../components/movie/Updiss.vue'


Vue.use(Router)

export default new Router({
   mode: 'history',
  routes: [
  {
    path: '/cinema',
    name: 'Cinema',
    component: Cinema
  },
  {
    path: '/mine',
    name: 'Mine',
    component: Mine,
  },
  {
    path: '/movie',
    name: 'Movie',
    component: Movie,
    children: [
    {
      path: 'undarway',
      name: 'Undarway',
      component: Undarway,
    },
    {
      path: 'upcoming',
      name: 'Upcoming',
      component: Upcoming
    },
    ]
  },
  {
    path: '/depage',
    name: 'DetailPage',
    component:  DetailPage
  },
  {
    path: '/city',
    name: ' City',
    component:City
  },
   {
    path: '/discuss',
    name: 'Discuss',
    component:Discuss
  },
  {
    path: '/updiss',
    name: 'Updiss',
    component:Updiss  
  }
  ]
})
