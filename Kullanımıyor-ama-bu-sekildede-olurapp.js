const ad = document.getElementById('ad');
const soyad = document.getElementById('soyad');
const mail = document.getElementById('mail');

const form = document.getElementById('form-rehber');
const kisiListesi = document.querySelector('.kisi-listesi')

//evet listenerlerin tanımlanması
form.addEventListener('submit',kaydet);
kisiListesi.addEventListener('click', kisiIslemleriniYap);


//tüm kişiler için dizi

const tumkisilerDizisi = [];
let secilenSatir = undefined;



function kisiIslemleriniYap(event) {

    if(event.target.classList.contains('btn--delete')){
        const silinecekTR = event.target.parentElement.parentElement;
        const silinecekMail = event.target.parentElement.previousElementSibling.textContent;
        kisiSil(silinecekTR, silinecekMail);
    }else if(event.target.classList.contains('btn--edit')) {
        document.querySelector('.kaydetGuncelle').value = 'Güncelle';
        const secilenTr = event.target.parentElement.parentElement;
        const guncellenecekMail = secilenTr.cells[2].textContent;

        ad.value = secilenTr.cells[0].textContent;
        soyad.value = secilenTr.cells[1].textContent;
        mail.value = secilenTr.cells[2].textContent;

        secilenSatir = secilenTr;
        console.log(tumkisilerDizisi);

    }

}

function kisiSil(silinecekTrElement, silinecekMail){
    silinecekTrElement.remove();
   console.log(silinecekTrElement, silinecekMail);
    
//    //mailie göre silme
//    tumkisilerDizisi.forEach((kisi, index) => {
//         if(kisi.mail === silinecekMail) {
//             tumkisilerDizisi.splice(index,1);
//         }
//    });


    const silinmeyecekKisiler = tumkisilerDizisi.filter(function(kisi, index){
        return kisi.mail !== silinecekMail;
    });
    tumkisilerDizisi.length = 0;
    tumkisilerDizisi.push(...silinmeyecekKisiler);
    
    alanlariTemizle();
    document.querySelector('.kaydetGuncelle').value = 'Kaydet';

   

}

function kaydet(e) {
    e.preventDefault();


    const eklenecekVeyaGuncellenecekKisi = {
        ad: ad.value,
        soyad: soyad.value,
        mail: mail.value
    }

    const sonuc = verileriKontrolEt(eklenecekVeyaGuncellenecekKisi);
    if(sonuc.durum) {

        if(secilenSatir) {
            kisiyiGuncelle(eklenecekVeyaGuncellenecekKisi);
        }else{
            kisiyiEkle(eklenecekVeyaGuncellenecekKisi);
        }
        
    }else{
        bilgiOlustur(sonuc.mesaj,sonuc.durum);
    }
    
}

function kisiyiGuncelle (kisi) {
    //kişi parametresinde seçilen kişinin yeni değerleri var
    //seçilen satırda eski değerler var

    for (let i = 0; i < tumkisilerDizisi.length; i++){
        if(tumkisilerDizisi[i].mail === secilenSatir.cells[2].textContent){
            tumkisilerDizisi[i] = kisi;
            break;
        }
    }

    secilenSatir.cells[0].textContent = kisi.ad;
    secilenSatir.cells[1].textContent = kisi.soyad;
    secilenSatir.cells[2].textContent = kisi.mail;

    document.querySelector('.kaydetGuncelle').value = 'Kaydet';
    secilenSatir = undefined;

    console.log(tumkisilerDizisi);
}

function kisiyiEkle(eklenecekKisi) {
    const olusturulanTrElementi = document.createElement('tr');
    olusturulanTrElementi.innerHTML = `<td>${eklenecekKisi.ad}</td>
    <td>${eklenecekKisi.soyad}</td>
    <td>${eklenecekKisi.mail}</td>
    <td>
        <button class="btn btn--edit"><i class="far fa-edit"></i> </button>
        <button class="btn btn--delete"><i class="far fa-trash-alt"></i></button>
    </td>`;

    kisiListesi.appendChild(olusturulanTrElementi);

    tumkisilerDizisi.push(eklenecekKisi);

    bilgiOlustur('Kişi Rehbere Kaydedildi', true);
    
}

function verileriKontrolEt(kisi) {
    for(const deger in kisi) {
        if(kisi[deger]){
            console.log(kisi[deger]);
        }else{
            const sonuc = {
                durum:false,
                mesaj: 'Boş alan bırakmayınız'
            }
            return  sonuc;
   
        }

    }
    alanlariTemizle();
    return {
        durum: true,
        mesaj : 'Kaydedildi'
    }
}

function bilgiOlustur(mesaj,durum) {
    const olusturulanBilgi = document.createElement('div');

    olusturulanBilgi.textContent = mesaj;
    olusturulanBilgi.className = 'bilgi';
     /* 
     if(durum) {
        olusturulanBilgi.classList.add('bilgi--success');
    }else{
        olusturulanBilgi.classList.add('bilgi--error');
    } 
    */

    olusturulanBilgi.classList.add(durum ? 'bilgi--success' : 'bilgi--error');

    document.querySelector('.container').insertBefore(olusturulanBilgi,form);

    //setTimeOut, setInterval
    setTimeout(function () {
        const silinecekDiv = document.querySelector('.bilgi');
        if(silinecekDiv){
            silinecekDiv.remove();
        }
    },2000);


}


function alanlariTemizle() {
    ad.value = '';
    soyad.value = '';
    mail.value = '';
}




