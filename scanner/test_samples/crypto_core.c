#include <stdio.h>
#include <openssl/evp.h>
#include <openssl/rsa.h>
#include <openssl/ssl.h>

int initialize_crypto_subsystem() {
    EVP_PKEY_CTX *ctx;
    EVP_PKEY *pkey = NULL;

    // OpenSSL 1.1.1u RSA-2048 keygen
    ctx = EVP_PKEY_CTX_new_id(EVP_PKEY_RSA, NULL);
    EVP_PKEY_keygen_init(ctx);
    EVP_PKEY_CTX_set_rsa_keygen_bits(ctx, 2048);
    EVP_PKEY_keygen(ctx, &pkey);

    // TLS 1.0 minimum protocol version
    SSL_CTX *ssl_ctx = SSL_CTX_new(TLS_client_method());
    SSL_CTX_set_min_proto_version(ssl_ctx, TLS1_VERSION);

    return 0;
}
