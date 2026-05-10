export type Produto = {
  titulo: { pt: string; en: string }
  img: string
  url: { pt: string; en: string }
}

export const produtosPorEpisodio: Record<string, Produto[]> = {
  '1-1': [
    {
      titulo: {
        pt: 'Camisa social masculina azul claro oxford',
        en: 'Alimens & Gentle Mens Solid Oxford Shirt Long Sleeve',
      },
      img: 'https://m.media-amazon.com/images/I/41RHrulSl8L._AC_SX300_.jpg',
      url: {
        pt: 'https://www.amazon.com.br/Lusead-masculina-neg%C3%B3cios-algod%C3%A3o-modelagem/dp/B0FLX9C5F1/',
        en: 'https://www.amazon.com/Alimens-Gentle-Casual-Oxford-Sleeve/dp/B0C6DTGZPQ/ref=sr_1_4?crid=LD7667WFPIFY&dib=eyJ2IjoiMSJ9.jyCkdeIQZVediu7kS4hhA6JtbhKv_ctCo3Xm8paImBGvFFZJ46crhm5jn38YGU5DhhELRsYCb23UH9Fmjd_rnid7I2S3CpxFNmPse6LBpRJmBhEoDQJn_E4d4EYtNJqkFG1p5_vxhOweh2tkMULzdk1kRrwC3Y4JpUor8hl9EyP6UKL8q1eI7XNgMuI0gtD-iMOx3gaxlRywHm8haHCl6boWY04oheC4J3_c6t0fWGg0cKY9zR-X0UzeFNFe4MJCkQxYxu0gyhMi9Ik5TvDyKIgs002f0cFjcYDHVR-NT9A.b3Sjsna-oyzTwgBUQiJptoZHhEAayPlLYEMvP1dF4Uc&dib_tag=se&keywords=camisa%2Bsocial%2Bmasculina%2Bazul%2Bclaro%2Boxford&qid=1778341462&sprefix=camisa%2Bbranca%2Boversized%2Bfeminina%2Bmanga%2Blonga%2Caps%2C615&sr=8-4&th=1&psc=1',
      },
    },
    {
      titulo: {
        pt: 'Camisa branca oversized feminina manga longa',
        en: 'siliteelon Button Down Shirts for Women',
      },
      img: 'https://m.media-amazon.com/images/I/3114WMCa%2bnL._AC_SX300_.jpg',
      url: {
        pt: 'https://www.amazon.com.br/Camisa-Oversized-Feminina-Algod%C3%A3o-Regular/dp/B0FWG4QPP3/',
        en: 'https://www.amazon.com/siliteelon-Fitted-Collared-Wrinkle-Tops-White/dp/B0DKJZB1XK/ref=sr_1_3?crid=WEJDJACO3XAY&dib=eyJ2IjoiMSJ9.dHmderYI-CN4KpGwwrWfiojO_F99AkKRUuwPdSg7uSrOYhmK_v2AgKqKrG2AMlr3to4WOx3yCtyIhhGJWMPoTqMaKHUXDBmKa9pLInzGObn-6xtH0zc3oYnf-WAOF4lB7i4OlFG8SsrBDiP8dnGbOidZC55ia8KUbWXNCfWOhsv1lbUJ169Ch67RRjCVxhrlMi1t84juCL2_f2YxPcpkqE3XYLkcteFDk_ekY5EcQhOT38RciRCRFclddGHunx9OylsPxCuO0Rk8FN46xkqfasX9Hb-4KtTvwdcGjJNFxh0.haFRyMqNCS9LPEXiJVMYOiGaYFUojo7xuRpH4c3CTdE&dib_tag=se&keywords=camisa%2Bbranca%2Boversized%2Bfeminina%2Bmanga%2Blonga&qid=1778341414&sprefix=camisa%2Bbranca%2Boversized%2Bfeminina%2Bmanga%2Blonga%2Caps%2C727&sr=8-3&th=1&psc=1',
      },
    },
    {
      titulo: {
        pt: 'Top / blusa rosa',
        en: 'Sports Bras for Women',
      },
      img: 'https://images-na.ssl-images-amazon.com/images/P/B08DNZVKKC.01.AC._SX300_.jpg',
      url: {
        pt: 'https://www.amazon.com.br/Suti%C3%A3-Regata-She-Feminino-Rosa/dp/B08DNZVKKC/',
        en: 'https://www.amazon.com/gp/aw/d/B0C1JBTXNZ/?_encoding=UTF8&pd_rd_plhdr=t&aaxitk=5c38a952e0ca358a35fb2f504337c83d&hsa_cr_id=0&qid=1778371544&sr=1-1-f02f01d6-adaf-4bef-9a7c-29308eff9043&ref_=sbx__sbtcd2_asin_0_img&pd_rd_w=QzZqP&content-id=amzn1.sym.d3360101-5266-4e0e-8e4a-de7eb0be6ed9%3Aamzn1.sym.d3360101-5266-4e0e-8e4a-de7eb0be6ed9&pf_rd_p=d3360101-5266-4e0e-8e4a-de7eb0be6ed9&pf_rd_r=STJ6ZRB5SQ071VSW0HXJ&pd_rd_wg=QbrvF&pd_rd_r=3061c6da-0a40-4a48-be00-766092404f4e&th=1&psc=1',
      },
    },
    {
      titulo: {
        pt: 'Calça jeans feminina azul claro',
        en: 'THUNDER STAR Womens High Waisted Wide Leg Jeans',
      },
      img: 'https://m.media-amazon.com/images/I/31bG5xpEOQL._AC_SX300_.jpg',
      url: {
        pt: 'https://www.amazon.com.br/Tommy-Hilfiger-Cal%C3%A7a-feminina-cintura/dp/B0GHR96PG1/',
        en: 'https://www.amazon.com/THUNDER-STAR-Waisted-Stretchy-Distressed/dp/B0FXJ1LWBY/ref=sxin_17_pa_sp_search_thematic_sspa?content-id=amzn1.sym.23f5260d-7152-40b9-8d45-9d9533ee0a5f%3Aamzn1.sym.23f5260d-7152-40b9-8d45-9d9533ee0a5f&crid=2O286P78S9T4H&cv_ct_cx=cal%C3%A7a%2Bjeans%2Bfeminina%2Bazul%2Bclaro&keywords=cal%C3%A7a%2Bjeans%2Bfeminina%2Bazul%2Bclaro&pd_rd_i=B0FXJ1LWBY&pd_rd_r=02019960-5c9e-4d99-a998-520228fc7c35&pd_rd_w=9Oxc7&pd_rd_wg=q8jZ2&pf_rd_p=23f5260d-7152-40b9-8d45-9d9533ee0a5f&pf_rd_r=YDEEFDAE1675ADZD813C&qid=1778341530&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sprefix=cal%C3%A7a%2Bjeans%2Bfeminina%2Bazul%2Bclaro%2Caps%2C914&sr=1-5-9dc94291-be46-4d4b-806d-52c7d80051d3-spons&aref=SzH9JrpnwF&sp_csd=d2lkZ2V0TmFtZT1zcF9zZWFyY2hfdGhlbWF0aWM&th=1&psc=1',
      },
    },
    {
      titulo: {
        pt: 'Cortina voil bege com forro',
        en: 'Chyhomenyc White Curtains',
      },
      img: 'https://m.media-amazon.com/images/I/41c5sniY1NL._AC_SX300_.jpg',
      url: {
        pt: 'https://www.amazon.com.br/Cortina-Voil-com-Forro-Microfibra/dp/B08T22D75L/',
        en: 'https://www.amazon.com/Chyhomenyc-Curtains-Textured-Filtering-Farmhouse/dp/B0C7BH6737/ref=sr_1_1_sspa?crid=3H6P3WDGD5HL6&dib=eyJ2IjoiMSJ9.gac1g-G4ZeaiJfSfYenCnHMdr8S1UoNFaJ_jCW_xuXN3KWBDJ4h0ICx9-cO46h6AAHvFBUll9PcqNkQ_ucvE2UYcQEWQ0z8LwEBK8D_9OlHVzmu0s8_Yj6X2XRgmc3koKt4Woo3yrvS6iOUfAoPMfas76XmWaBf8C4J60cyGrJihlIMTuxYQE3kfi-PoiKOYE_JwFvpk8hkDbb_sWgw6Fsqt2kt4Vmv5_u7HPmw8KA4E2LO_gDx4Hg2EUpANUT-BHlBOjzwcJVjaWJdto0xy3Qh0GLfHz95T7D2cI5VMJGI.G9j_cCculKMrCjYNZepqZ7ERWo0m_Trzch5cRo-h9hQ&dib_tag=se&keywords=cortina%2Bwhite&qid=1778371658&sprefix=cortina%2Bwhite%2Caps%2C218&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1',
      },
    },
  ],
}
