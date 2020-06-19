public with sharing class searchRecord {
    @AuraEnabled(Cacheable=true)
    public static List<Account> search(Integer LimitRec, String searchName) {
        searchName = '%' + searchName + '%';
        list<Account> accList = [SELECT  Name,Type,Phone  FROM Account where Name like:searchName LIMIT:LimitRec]; 
        if(accList.isEmpty()) {
            throw new AuraHandledException('No Record Found..');
        }
        return accList;
        }
}