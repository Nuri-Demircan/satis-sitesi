// Uygulama için yapılandırma dosyası
export const CONFIG = {
    // WhatsApp numarası (başındaki + işareti olmadan, ülke kodu dahil)
    WHATSAPP_NUMBER: '905313302565',

    // Admin panel şifresi
    ADMIN_PASSWORD: 'admin123',

    // Firma bilgileri
    COMPANY: {
        name: 'Rota Yem',
        tagline: 'Doğadan Sofraya, Sağlıkla',
        phone: '+90 531 330 25 65',
        email: 'dinceryem07@gmail.com',
        address: 'Çomaklı, 07800 Korkuteli/Antalya',
        mapEmbedUrl:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12697.373475543114!2d30.239910270196646!3d37.28699512583312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c4039afdc5b395%3A0x94f414b33789656a!2s%C3%87omakl%C4%B1%2C%2007800%20Korkuteli%2FAntalya!5e0!3m2!1str!2str!4v1772099377853!5m2!1str!2str',
    },
};

// WhatsApp mesajı oluşturma
export const buildWhatsAppUrl = (
    productName: string,
    description: string,
    price: string,
    imageUrl: string
) => {
    const message = `Merhaba, aşağıdaki ürün için sipariş vermek istiyorum:\n\nÜrün Adı: ${productName}\nAçıklama: ${description}\nFiyat: ${price || 'Belirtilmemiş'}\n\nÜrün Görseli: ${imageUrl || 'Görsel yok'}`;
    const encoded = encodeURIComponent(message);
    return `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encoded}`;
};
