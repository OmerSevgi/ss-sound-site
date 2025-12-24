const mongoose = require('mongoose');

const siteContentSchema = new mongoose.Schema({
  singleton: {
    type: String,
    default: 'main',
    unique: true,
    required: true,
  },
  heroTitle: {
    type: String,
    default: 'Hayallerinizdeki Etkinlikler',
  },
  heroSubtitle: {
    type: String,
    default: 'Düğün, konser, festival ve tüm özel anlarınızda profesyonel dokunuşlar.',
  },
  servicesTitle: {
    type: String,
    default: 'Hizmetlerimiz',
  },
        servicesSubtitle: {
          type: String,
          default: 'Neler Yapıyoruz?',
        },
        galleryTitle: {
          type: String,
          default: 'Galerimiz',
        },
      gallerySubtitle: {
        type: String,
        default: 'Geçmiş Etkinliklerden Kareler',
      },
      eventsTitle: {
        type: String,
        default: 'Son Etkinlikler',
      },
      eventsSubtitle: {
        type: String,
        default: 'Kaçırmamanız Gerekenler',
      },
      contactTitle: {
        type: String,
        default: 'Bize Ulaşın',
      },
      contactSubtitle: {
        type: String,
        default: 'Etkinlikleriniz hakkında konuşmak için sabırsızlanıyoruz.',
      },
      contactButtonText: {
        type: String,
        default: 'Mesajı Gönder',
      },
      facebookUrl: {
        type: String,
        default: '#',
      },
      instagramUrl: {
        type: String,
        default: '#',
      },
      phoneNumber: {
        type: String,
        default: '',
      },
}, { timestamps: true });

const SiteContent = mongoose.model('SiteContent', siteContentSchema);

module.exports = SiteContent;
