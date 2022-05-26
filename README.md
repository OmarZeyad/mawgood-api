# Mawgood API
Backend REST API for Mawgood mobile app, sell & compare medical equipment.

## Types
- **/types**
  - /
    ```
    GET:  get all types
    POST: create new type <admin only>
    ```
  - /:typeName/brands
    ```
    GET | POST: forward to /brands
    ```

## Brands
- **/brands**
  - /
    ```
    GET:  get all brands
    POST: create new brand <admin only>
    ```
  - /:brandName/equipment
    ```
    GET | POST: forward to /equipment
    ```

## Equipment
- **/equipment**
  - /
    ```
    GET:  get all new equipment under brand
    POST: create new equipment under brand <admin only>
    ```
  - /used
    ```
    GET:  get all used equipment
    POST: create used equipment <user only, gets reviewed first>
    ```
  - /:equipmentId
    ```
    GET:    get equipment
    PUT:    update equipment <admin only>
    DELETE: delete equipment <admin only>
    ```
  - /:equipmentId/comparison
    ```
    GET: compare this equipment with [id1, id2, ...]
    req.body: {
      "with": [id1, id2, ...]
    }
    ```

## Terms
- **/terms**
  - /
    ```
    GET:  get all terms
    POST: create new term <admin only>
    ```
  - /:termName
    ```
    GET:    get term
    PUT:    update term <admin only>
    DELETE: delete term <admin only>
    ```

## Offers
- **/offers**
  - /
    ```
    GET:  get all offers
    POST: create new offer <admin only>
    ```
  - /:offerId
    ```
    GET:    get offer
    PUT:    update offer <admin only>
    DELETE: delete offer <admin only>
    ```
