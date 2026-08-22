**1.1** `POST /api/auth/signup`  
User registration | No Auth Required    --------> Done

**1.2** `POST /api/auth/login`  
Standard login | No Auth Required       --------> Done

**1.3** `POST /api/auth/emergency-login`  
Emergency/SOS login | No Auth Required  ---------> Done

**1.4** `POST /api/auth/logout`  
User logout | Auth Required             ----------> Done

**1.5** `POST /api/auth/refresh-token`  
Refresh access token | Auth Required   -> Phase 03

**1.6** `POST /api/auth/forgot-password`  
Request password reset | No Auth Required  --> Phase 02

**1.7** `POST /api/auth/reset-password`  
Reset password with token | No Auth Required  ---> Phase 02 

**1.8** `POST /api/auth/verify-email`  
Email verification | No Auth Required   -----> Phase 03

---

