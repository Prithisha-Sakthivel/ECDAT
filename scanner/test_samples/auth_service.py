# Test Python Source Code for ECDAT Discovery Engine
from Crypto.PublicKey import RSA
from Crypto.Cipher import AES, PKCS1_OAEP
import ssl
import hashlib

def init_identity_provider():
    # Vulnerable to Shor's Algorithm: RSA-2048 keypair
    rsa_key = RSA.generate(2048)
    private_key = rsa_key.export_key()

    # Legacy Symmetric Cipher: AES-128-CBC (Vulnerable under Grover)
    cipher = AES.new(b'16bytekey1234567', AES.MODE_CBC, iv=b'16byteinitvec123')

    # Insecure TLS Context (TLS 1.0/1.1)
    legacy_tls = ssl.SSLContext(ssl.PROTOCOL_TLSv1_1)

    # Legacy Hash Function
    weak_hash = hashlib.md5(b"test_payload").hexdigest()

    return private_key, cipher, legacy_tls
